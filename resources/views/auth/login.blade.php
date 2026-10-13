<!DOCTYPE html>
<html lang="id" class="dark h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Eco Land — Masuk ke Sistem</title>
    <meta name="description" content="Eco Land — Land and Green Space Management System — Masuk ke Sistem Administrator">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=outfit:400,500,600,700,800|inter:400,500,600,700&display=swap" rel="stylesheet" />

    <style>
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :root {
            --primary: #10b981;
            --primary-hover: #059669;
            --primary-glow: rgba(16, 185, 129, 0.45);
            --accent-emerald: #34d399;
            --bg-deep: #050e09;
            --glass-bg: rgba(6, 20, 14, 0.72);
            --glass-border: rgba(255, 255, 255, 0.12);
            --glass-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--bg-deep);
            color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        /* Ambient Glow Blobs behind glass */
        .ambient-glow-1 {
            position: fixed;
            top: 20%;
            left: 20%;
            width: 420px;
            height: 420px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0) 70%);
            filter: blur(60px);
            z-index: 1;
            pointer-events: none;
            animation: pulseGlow 9s ease-in-out infinite alternate;
        }

        .ambient-glow-2 {
            position: fixed;
            bottom: 15%;
            right: 20%;
            width: 460px;
            height: 460px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(5, 150, 105, 0.18) 0%, rgba(5, 150, 105, 0) 70%);
            filter: blur(65px);
            z-index: 1;
            pointer-events: none;
            animation: pulseGlow 11s ease-in-out infinite alternate-reverse;
        }

        @keyframes pulseGlow {
            0% { transform: scale(0.9) translate(-15px, -15px); opacity: 0.7; }
            100% { transform: scale(1.18) translate(15px, 15px); opacity: 1; }
        }

        @media (max-width: 767.98px) {
            .ambient-glow-1, .ambient-glow-2 {
                display: none !important;
            }
        }

        /* Viewport Layout */
        .login-wrapper {
            position: relative;
            z-index: 10;
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px 16px;
            background: radial-gradient(circle at 50% 50%, #061910 0%, #030805 100%);
        }

        /* Glassmorphism Card Container */
        .glass-card {
            position: relative;
            width: 100%;
            max-width: 460px;
            background: var(--glass-bg);
            -webkit-backdrop-filter: blur(24px) saturate(190%);
            backdrop-filter: blur(24px) saturate(190%);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 38px 32px 28px;
            box-shadow: var(--glass-shadow);
            animation: cardAppear 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            overflow: hidden;
        }

        /* Top shine gradient highlight */
        .glass-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), rgba(16, 185, 129, 0.9), rgba(52, 211, 153, 0.8), transparent);
        }

        /* Subtle radial corner glow */
        .glass-card::after {
            content: '';
            position: absolute;
            top: -100px;
            right: -100px;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
            pointer-events: none;
        }

        @keyframes cardAppear {
            0% {
                opacity: 0;
                transform: translateY(24px) scale(0.97);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* Brand Header & Logo */
        .brand-header {
            text-align: center;
            margin-bottom: 24px;
        }

        .logo-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 78px;
            height: 78px;
            border-radius: 18px;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
            border: 1px solid rgba(16, 185, 129, 0.3);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25);
            margin-bottom: 14px;
            position: relative;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .logo-wrap:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 16px 36px var(--primary-glow), inset 0 1px 1px rgba(255, 255, 255, 0.4);
        }

        .logo-icon-svg {
            width: 44px;
            height: 44px;
            color: #34d399;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35));
        }

        .brand-title {
            font-family: 'Outfit', sans-serif;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #ffffff;
            line-height: 1.2;
            margin-bottom: 5px;
            background: linear-gradient(135deg, #ffffff 40%, #a7f3d0 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .brand-subtitle {
            font-size: 13px;
            color: #94a3b8;
            font-weight: 400;
        }

        /* Back Button */
        .btn-glass-back {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%);
            -webkit-backdrop-filter: blur(16px);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.22);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            text-decoration: none;
        }

        .btn-glass-back:hover {
            transform: translateY(-2px) scale(1.05);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(16, 185, 129, 0.25) 100%);
            border-color: rgba(52, 211, 153, 0.6);
            color: #ffffff !important;
            box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.45), 0 0 15px rgba(52, 211, 153, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        .btn-glass-back:active {
            transform: translateY(0) scale(0.96);
        }

        /* Submit Button with Shimmer */
        .btn-submit {
            position: relative;
            width: 100%;
            height: 48px;
            background: linear-gradient(135deg, rgba(5, 150, 105, 0.75) 0%, rgba(16, 185, 129, 0.85) 50%, rgba(52, 211, 153, 0.75) 100%);
            -webkit-backdrop-filter: blur(20px);
            backdrop-filter: blur(20px);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.35);
            border-radius: 14px;
            font-size: 14.5px;
            font-weight: 700;
            letter-spacing: -0.01em;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5);
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
        }

        .btn-submit::before {
            content: '';
            position: absolute;
            top: 0;
            left: -120%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
            transition: 0.6s ease;
        }

        .btn-submit:hover {
            transform: translateY(-2.5px) scale(1.015);
            background: linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(16, 185, 129, 0.95) 50%, rgba(52, 211, 153, 0.9) 100%);
            border-color: rgba(255, 255, 255, 0.65);
            box-shadow: 0 18px 36px -6px rgba(16, 185, 129, 0.65), 0 0 24px rgba(52, 211, 153, 0.45), inset 0 1px 2px 0 rgba(255, 255, 255, 0.75);
            color: #ffffff;
        }

        .btn-submit:hover::before {
            left: 120%;
        }

        .btn-submit:active {
            transform: translateY(0) scale(0.98);
            box-shadow: 0 6px 18px rgba(16, 185, 129, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-submit:disabled {
            opacity: 0.65;
            cursor: not-allowed;
            transform: none !important;
        }

        /* Glassmorphism Secondary Button (Google SSO) */
        .btn-glass-secondary {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
            -webkit-backdrop-filter: blur(16px);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2);
            color: #e2e8f0;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-glass-secondary:hover {
            transform: translateY(-2px) scale(1.015);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%);
            border-color: rgba(255, 255, 255, 0.4);
            color: #ffffff;
            box-shadow: 0 12px 28px -5px rgba(0, 0, 0, 0.5), 0 0 18px rgba(255, 255, 255, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.45);
        }

        .btn-glass-secondary:active {
            transform: translateY(0) scale(0.98);
        }

        /* Alert Styling */
        .alert-box {
            padding: 12px 16px;
            border-radius: 14px;
            font-size: 13px;
            line-height: 1.5;
            margin-bottom: 18px;
            backdrop-filter: blur(12px);
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }

        .alert-error {
            background: rgba(153, 27, 27, 0.45);
            border: 1px solid rgba(239, 68, 68, 0.45);
            color: #fecaca;
        }

        .alert-warning {
            background: rgba(180, 83, 9, 0.45);
            border: 1px solid rgba(245, 158, 11, 0.45);
            color: #fef3c7;
        }

        .alert-success {
            background: rgba(6, 95, 70, 0.45);
            border: 1px solid rgba(16, 185, 129, 0.45);
            color: #a7f3d0;
        }
    </style>
</head>
<body>
    <!-- Ambient Glow Blobs -->
    <div class="ambient-glow-1"></div>
    <div class="ambient-glow-2"></div>

    <div class="login-wrapper">
        <div class="glass-card">
            <!-- Tautan Kembali -->
            <a href="/"
               class="btn-glass-back"
               style="position: absolute; top: 16px; left: 16px; z-index: 20; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 12px; color: #cbd5e1; font-size: 12px; font-weight: 600;"
               title="Kembali ke Beranda Eco Land">
                <svg style="width: 14px; height: 14px; transition: transform 0.25s ease;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Kembali</span>
            </a>

            <!-- Brand Header -->
            <div class="brand-header">
                <a href="/" style="display: inline-block; text-decoration: none;">
                    <div class="logo-wrap">
                        <svg class="logo-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 01-9-9c0-4.97 4.03-9 9-9 4.14 0 7.63 2.8 8.65 6.64.12.44-.22.86-.68.86h-2.18c-.46 0-.85.34-.94.79a5.002 5.002 0 01-4.85 4.71H12v6z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18" />
                        </svg>
                    </div>
                </a>
                <h1 class="brand-title">Eco Land</h1>
                <p class="brand-subtitle">Land and Green Space Management System</p>
            </div>

            <!-- Session Status / Alerts -->
            @if(session('error'))
                <div class="alert-box alert-error">
                    <span style="font-size: 16px;">⚠️</span>
                    <div>{{ session('error') }}</div>
                </div>
            @endif

            @if(session('warning'))
                <div class="alert-box alert-warning">
                    <span style="font-size: 16px;">ℹ️</span>
                    <div>{{ session('warning') }}</div>
                </div>
            @endif

            @if(session('success') || session('status'))
                <div class="alert-box alert-success">
                    <span style="font-size: 16px;">✓</span>
                    <div>{{ session('success') ?? session('status') }}</div>
                </div>
            @endif

            <!-- Formulir Login Biasa -->
            <form id="form-login" method="POST" action="{{ route('login.post') }}" style="display: flex; flex-direction: column; gap: 16px;">
                @csrf

                <!-- Input Email / Username -->
                <div>
                    <label for="username" style="display: block; font-size: 12px; font-weight: 600; color: #a7f3d0; margin-bottom: 6px;">
                        Alamat Email / Akun Administrator
                    </label>
                    <div style="position: relative; display: flex; align-items: center;">
                        <span style="position: absolute; left: 14px; z-index: 20; pointer-events: none; color: #34d399; display: flex; align-items: center;">
                            <svg style="width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <input id="username"
                            type="text"
                            name="username"
                            value="{{ old('username') }}"
                            required
                            autofocus
                            autocomplete="username"
                            placeholder="admin@ecoland.local atau admin"
                            style="width: 100%; padding: 11px 16px 11px 44px; font-size: 14px; border-radius: 12px; background: rgba(3, 14, 8, 0.75); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; outline: none; transition: all 0.2s ease;"
                            onfocus="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 0 3px rgba(16, 185, 129, 0.3)';"
                            onblur="this.style.borderColor='rgba(255, 255, 255, 0.2)'; this.style.boxShadow='none';" />
                    </div>
                </div>

                <!-- Input Kata Sandi -->
                <div>
                    <label for="password" style="display: block; font-size: 12px; font-weight: 600; color: #a7f3d0; margin-bottom: 6px;">
                        Kata Sandi
                    </label>
                    <div style="position: relative; display: flex; align-items: center;">
                        <span style="position: absolute; left: 14px; z-index: 20; pointer-events: none; color: #34d399; display: flex; align-items: center;">
                            <svg style="width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7 11V7a5 5 0 0110 0v4" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <input id="password"
                            type="password"
                            name="password"
                            required
                            autocomplete="current-password"
                            placeholder="••••••••"
                            style="width: 100%; padding: 11px 44px 11px 44px; font-size: 14px; border-radius: 12px; background: rgba(3, 14, 8, 0.75); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; outline: none; transition: all 0.2s ease;"
                            onfocus="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 0 3px rgba(16, 185, 129, 0.3)';"
                            onblur="this.style.borderColor='rgba(255, 255, 255, 0.2)'; this.style.boxShadow='none';" />

                        <!-- Tombol Tampilkan/Sembunyikan Kata Sandi -->
                        <button type="button"
                            id="btn-toggle-password"
                            aria-label="Tampilkan atau sembunyikan kata sandi"
                            style="position: absolute; right: 12px; z-index: 20; background: none; border: none; padding: 4px; border-radius: 8px; color: #94a3b8; cursor: pointer; display: flex; align-items: center; transition: all 0.2s;"
                            onmouseover="this.style.color='#34d399';"
                            onmouseout="this.style.color='#94a3b8';"
                            title="Tampilkan / Sembunyikan Kata Sandi">
                            <svg id="icon-eye-open" style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg id="icon-eye-closed" style="width: 18px; height: 18px; display: none;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; padding-top: 2px;">
                    <label for="remember_me" style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; color: #cbd5e1;">
                        <input id="remember_me"
                            type="checkbox"
                            name="remember"
                            style="width: 16px; height: 16px; border-radius: 4px; background: #0b1a12; border: 1px solid rgba(255, 255, 255, 0.2); accent-color: #10b981; cursor: pointer;" />
                        <span>Ingat Saya</span>
                    </label>

                    <a href="javascript:void(0);"
                       onclick="alert('Untuk mereset kata sandi akun administrator Eco Land, silakan hubungi tim DevOps atau administrator utama.');"
                       style="color: #34d399; text-decoration: none; transition: color 0.2s;"
                       onmouseover="this.style.textDecoration='underline';"
                       onmouseout="this.style.textDecoration='none';">
                        Lupa kata sandi?
                    </a>
                </div>

                <!-- Tombol Utama: Masuk ke Eco Land -->
                <div style="padding-top: 6px;">
                    <button type="submit" id="btn-login-submit" class="btn-submit">
                        <span id="btn-login-text">Masuk ke Eco Land</span>
                        <svg id="btn-login-icon" style="width: 16px; height: 16px; transition: transform 0.25s ease;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                <!-- Pemisah "Atau masuk dengan" -->
                <div style="position: relative; margin: 10px 0; display: flex; align-items: center;">
                    <div style="flex-grow: 1; border-top: 1px solid rgba(255, 255, 255, 0.12);"></div>
                    <span style="flex-shrink: 0; margin: 0 14px; font-size: 12px; color: #94a3b8;">Atau masuk dengan</span>
                    <div style="flex-grow: 1; border-top: 1px solid rgba(255, 255, 255, 0.12);"></div>
                </div>

                <!-- Tombol SSO Google -->
                <div>
                    <a href="{{ route('auth.google.redirect') }}"
                       id="btn-google-sso"
                       class="btn-glass-secondary"
                       style="width: 100%; height: 46px; display: flex; align-items: center; justify-content: center; gap: 10px; border-radius: 14px; font-size: 14px; font-weight: 600;">
                        <!-- Official Google Logo SVG -->
                        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span id="btn-google-text">Masuk dengan Google</span>
                    </a>
                </div>
            </form>

            <!-- Footer -->
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center; font-size: 12px; color: #64748b;">
                Copyright &copy; 2026 <span style="color: #a7f3d0; font-weight: 500;">Eco Land</span>. All Rights Reserved.
            </div>
        </div>
    </div>

    <script>
        // Toggle Show / Hide Password
        const btnTogglePassword = document.getElementById('btn-toggle-password');
        const passwordInput = document.getElementById('password');
        const iconEyeOpen = document.getElementById('icon-eye-open');
        const iconEyeClosed = document.getElementById('icon-eye-closed');

        if (btnTogglePassword && passwordInput) {
            btnTogglePassword.addEventListener('click', () => {
                const isPassword = passwordInput.getAttribute('type') === 'password';
                passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
                iconEyeOpen.style.display = isPassword ? 'none' : 'block';
                iconEyeClosed.style.display = isPassword ? 'block' : 'none';
            });
        }

        // Form Submit Loading State
        const formLogin = document.getElementById('form-login');
        const btnLoginSubmit = document.getElementById('btn-login-submit');
        const btnLoginText = document.getElementById('btn-login-text');

        if (formLogin && btnLoginSubmit) {
            formLogin.addEventListener('submit', () => {
                btnLoginSubmit.disabled = true;
                btnLoginText.textContent = 'Memverifikasi...';
            });
        }

        // Google SSO Click Loading State
        const btnGoogle = document.getElementById('btn-google-sso');
        const btnGoogleText = document.getElementById('btn-google-text');

        if (btnGoogle && btnGoogleText) {
            btnGoogle.addEventListener('click', () => {
                btnGoogle.style.pointerEvents = 'none';
                btnGoogle.style.opacity = '0.75';
                btnGoogleText.textContent = 'Mengarahkan ke Google...';
            });
        }
    </script>
</body>
</html>
