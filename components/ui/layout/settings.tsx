"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PrismaClient } from '@prisma/client'
import { supabase } from '@/lib/supabase'
import { authenticator } from 'otplib'

const prisma = new PrismaClient()

export function Settings() {
  const [user, setUser] = useState<any>(null)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [twoFactorSecret, setTwoFactorSecret] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
        if (dbUser) {
          setIs2FAEnabled(dbUser.is2FAEnabled)
          setNotificationsEnabled(dbUser.notificationsEnabled)
          setLanguage(dbUser.language)
          setTheme(dbUser.theme)
        }
      }
    }
    fetchUser()
  }, [])

  const handle2FAToggle = async () => {
    if (!is2FAEnabled) {
      const secret = authenticator.generateSecret()
      setTwoFactorSecret(secret)
      setIs2FAEnabled(true)
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { is2FAEnabled: false, twoFactorSecret: null }
      })
      setIs2FAEnabled(false)
      setTwoFactorSecret('')
    }
  }

  const handle2FAVerify = async () => {
    const isValid = authenticator.verify({ token: twoFactorCode, secret: twoFactorSecret })
    if (isValid) {
      await prisma.user.update({
        where: { id: user.id },
        data: { is2FAEnabled: true, twoFactorSecret }
      })
      setTwoFactorSecret('')
      setTwoFactorCode('')
    } else {
      alert('Invalid 2FA code. Please try again.')
    }
  }

  const handleNotificationsToggle = async () => {
    const newValue = !notificationsEnabled
    setNotificationsEnabled(newValue)
    await prisma.user.update({
      where: { id: user.id },
      data: { notificationsEnabled: newValue }
    })
  }

  const handleLanguageChange = async (value: string) => {
    setLanguage(value)
    await prisma.user.update({
      where: { id: user.id },
      data: { language: value }
    })
  }

  const handleThemeChange = async (value: string) => {
    setTheme(value)
    await prisma.user.update({
      where: { id: user.id },
      data: { theme: value }
    })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Enhance your account security</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="2fa"
                checked={is2FAEnabled}
                onCheckedChange={handle2FAToggle}
              />
              <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
            </div>
            {is2FAEnabled && twoFactorSecret && (
              <div className="space-y-2">
                <p>Scan this QR code with your authenticator app:</p>
                <img
                  src={`https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/IWO:${user.email}?secret=${twoFactorSecret}&issuer=IWO`}
                  alt="2FA QR Code"
                />
                <Label htmlFor="2fa-code">Enter the 6-digit code from your app:</Label>
                <Input
                  id="2fa-code"
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Enter 2FA code"
                />
                <Button onClick={handle2FAVerify}>Verify</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={handleNotificationsToggle}
            />
            <Label htmlFor="notifications">Enable Notifications</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>Choose your preferred language</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={theme} onValueChange={handleThemeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}

