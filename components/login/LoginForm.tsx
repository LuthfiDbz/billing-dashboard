"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { loginAsGuest } from "@/app/login/actions";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGuestLogin() {
    setIsLoading(true);
		const result = await loginAsGuest();
		if (result?.error) {
			alert(result.error)
			setIsLoading(false)
		}
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-xl font-bold">FB</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Welcome to FinBill</CardTitle>
        <CardDescription>
          Your fintech billing management system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border border-muted bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <UserCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Guest Access</p>
                <p className="text-xs text-muted-foreground">
                  Click below to explore the dashboard with demo data. No registration required.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <UserCircle className="mr-2 h-4 w-4" />
                Login as Guest
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}