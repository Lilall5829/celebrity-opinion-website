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
import { registerUser } from "@/lib/api"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // 简单验证
    if (!formData.name || !formData.email || !formData.password) {
      setError("请填写所有必填字段")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("两次输入的密码不一致")
      return
    }

    setLoading(true)
    try {
      const response = await registerUser(formData.email, formData.password, formData.name)

      // 保存token到localStorage
      localStorage.setItem("auth_token", response.data.token)

      // 跳转到首页
      router.push("/")
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "注册失败，请稍后再试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">创建账号</CardTitle>
          <CardDescription>填写以下信息创建您的账号</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">用户名</Label>
              <Input
                id="name"
                name="name"
                placeholder="请输入用户名"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "注册中..." : "注册"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            已有账号？{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              登录
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}

