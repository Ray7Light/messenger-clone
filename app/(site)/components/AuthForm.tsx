'use client';

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from 'react-icons/bs';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";

import AuthSocialButton from "./AuthSocialButton";

enum VariantEnum {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

const AuthForm = () => {
  const [variant, setVariant] = useState<VariantEnum>(VariantEnum.LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: {
    errors
  } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === VariantEnum.REGISTER) {
      // Axios Register
    }

    if (variant === VariantEnum.LOGIN) {
      // NextAuth SignIn
    }
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === VariantEnum.REGISTER && (
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              {variant === VariantEnum.LOGIN ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === VariantEnum.LOGIN ? 'New to Messenger?' : 'Already have an account?'}
          </div>
          <div
            className="underline cursor-pointer"
            onClick={toggleVariant}
          >
            {variant === VariantEnum.LOGIN ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )

  function socialAction(action: string) {
    setIsLoading(true);

    // NextAuth Social Sign In
  }

  function toggleVariant() {
    setVariant((current) => {
      if (current === VariantEnum.LOGIN) {
        return VariantEnum.REGISTER;
      }

      return VariantEnum.LOGIN;
    })
  }
}

export default AuthForm;