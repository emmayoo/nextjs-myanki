"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { typeToFlattenedError, z } from "zod";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { redirect } from "next/navigation";
import { saveSession } from "@/lib/session";

const checkUsernameUnique = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

const checkEmailUnique = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !user;
};

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(0, "이름을 적어주세요.")
      .refine(checkUsernameUnique, "이미 사용 중인 이름입니다."),
    email: z
      .string()
      .email("이메일을 올바르게 입력하세요.")
      .refine(checkEmailUnique, "이미 사용 중인 이메일입니다"),
    password: z
      .string()
      .min(0, "비밀번호를 입력해주세요.")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string(),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 서로 다릅니다.",
    path: ["confirmPassword"],
  });

type FormType = z.infer<typeof formSchema>;

type StateType = {
  data?: FormType;
  fieldErrors: typeToFlattenedError<FormType>["fieldErrors"];
};

export const createUser = async (
  prevState: StateType | null,
  formData: FormData
) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return {
      data: data as FormType,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  const user = await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("user 생성 오류");
  }

  await saveSession(user.id);
  redirect("/home");
};
