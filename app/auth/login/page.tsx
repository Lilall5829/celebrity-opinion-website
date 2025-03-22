"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/lib/api"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.email || !formData.password) {
      setError("请填写邮箱和密码")
      return
    }

    setLoading(true)
    try {
      const response = await loginUser(formData.email, formData.password)

      // 保存token到localStorage
      localStorage.setItem("auth_token", response.data.token)

      // 跳转到首页
      router.push("/")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "登录失败，请检查邮箱和密码")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">账号登录</CardTitle>
          <CardDescription>输入您的邮箱和密码登录</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="请输入邮箱"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="请输入密码"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  记住我
                </Label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                忘记密码？
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "登录中..." : "登录"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            还没有账号？{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              注册
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}

