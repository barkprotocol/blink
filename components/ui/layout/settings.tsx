"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function Settings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [twoFactorSecret, setTwoFactorSecret] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('light')
  const { toast } = useToast()

  useEffect(() => {
    // Fetch user settings from API or local storage
    // This is a placeholder for demonstration purposes
    const fetchSettings = async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIs2FAEnabled(false)
      setNotificationsEnabled(true)
      setLanguage('en')
      setTheme('light')
    }
    fetchSettings()
  }, [])

  const handle2FAToggle = async () => {
    if (!is2FAEnabled) {
      // Generate 2FA secret
      // This is a placeholder and should be replaced with actual 2FA secret generation
      const secret = 'ABCDEFGHIJKLMNOP'
      setTwoFactorSecret(secret)
      setIs2FAEnabled(true)
      toast({
        title: "2FA Enabled",
        description: "Please scan the QR code and enter the verification code.",
      })
    } else {
      // Disable 2FA
      setIs2FAEnabled(false)
      setTwoFactorSecret('')
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled.",
      })
    }
  }

  const handle2FAVerify = async () => {
    // Verify 2FA code
    // This is a placeholder and should be replaced with actual 2FA verification
    if (twoFactorCode === '123456') {
      toast({
        title: "2FA Verified",
        description: "Two-factor authentication has been successfully set up.",
      })
      setTwoFactorCode('')
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 2FA code.",
        variant: "destructive",
      })
    }
  }

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
    toast({
      title: notificationsEnabled ? "Notifications Disabled" : "Notifications Enabled",
      description: `You have ${notificationsEnabled ? 'disabled' : 'enabled'} notifications.`,
    })
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    toast({
      title: "Language Updated",
      description: `Your language preference has been updated to ${value}.`,
    })
  }

  const handleThemeChange = (value: string) => {
    setTheme(value)
    toast({
      title: "Theme Updated",
      description: `Your theme preference has been updated to ${value}.`,
    })
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
                  src={`https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/IWO:${twoFactorSecret}?secret=${twoFactorSecret}&issuer=IWO`}
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

