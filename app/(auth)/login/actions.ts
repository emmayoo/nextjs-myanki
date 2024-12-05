"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { typeToFlattenedError, z } from "zod";
import { redirect } from "next/navigation";
import { saveSession } from "@/lib/session";

const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
};

const formSchema = z.object({
  email: z
    .string()
    .email("이메일을 올바르게 입력하세요.")
    .refine(checkEmailExist, "존재하지 않는 이메일입니다."),
  password: z.string({
    required_error: "비밀번호를 입력해주세요.",
  }),
});

type FormType = z.infer<typeof formSchema>;

type StateType = {
  data?: FormType;
  fieldErrors: typeToFlattenedError<FormType>["fieldErrors"];
};

export const logIn = async (
  prevState: StateType | null,
  formData: FormData
) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return {
      data: data as FormType,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email },
    select: { id: true, password: true },
  });

  const ok = await bcrypt.compare(result.data.password, user?.password ?? "");

  if (ok) {
    await saveSession(user!.id);

    redirect("/home");
  } else {
    return {
      data: data as FormType,
      fieldErrors: {
        email: [],
        password: ["비밀번호가 틀렸습니다."],
      },
    };
  }
};
