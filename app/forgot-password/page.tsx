'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { requestPasswordReset } from '@/app/lib/actions';
import { Button } from '@/app/ui/Button';
import { AtSymbolIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import darkTheme from '@/app/lib/dark-theme';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import NimbusLogo from '@/app/ui/Nimbus-logo';

export default function ForgotPasswordPage() {
  const [state, dispatch] = useFormState(requestPasswordReset, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }

    if (state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <main className="flex min-h-screen items-center justify-center px-2 sm:px-0">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-3 sm:p-4 md:-mt-32">

        {/* Header */}
        <div className="flex h-20 sm:h-24 md:h-36 w-full items-end rounded-lg bg-violet-600 p-3">
          <div className="w-full text-white">
            <NimbusLogo />
          </div>
        </div>

        {/* Card */}
        <div
          className="flex-1 rounded-lg bg-gray-50 dark:bg-[#212121]
          px-4 sm:px-6 pb-4 pt-6 sm:pt-8"
        >
          <h1 className={`${lusitana.className} mb-3 text-xl sm:text-2xl ${darkTheme.title}`}>
            Forgot your password?
          </h1>

          <p className={`mb-4 text-sm ${darkTheme.text}`}>
            Enter your email and we&apos;ll send you a reset link.
          </p>

          <form action={dispatch} className="space-y-3">
            <div className="w-full">
              <label
                htmlFor="email"
                className={`mb-3 mt-4 block text-xs font-medium text-gray-900 ${darkTheme.text}`}
              >
                Email:
              </label>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className={`peer block w-full rounded-md border border-gray-200
                    py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500
                    ${darkTheme.border} ${darkTheme.bg} ${darkTheme.text}
                  `}
                />
                <AtSymbolIcon
                  className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px]
                    -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                    ${darkTheme.inputIcon}
                  `}
                />
              </div>
            </div>

            <Button className="mt-4 w-full">
              Send reset link
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </form>

          <Button
            className="mt-2 w-full"
            onClick={() => router.replace('/login')}
          >
            Back to Login
            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
        </div>
      </div>
    </main>
  );
}
