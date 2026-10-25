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
            --primary: #3B82F6;
            --primary-hover: #2563EB;
            --primary-glow: rgba(59, 130, 246, 0.45);
            --accent-emerald: #60A5FA;
            --bg-deep: #0F172A;
            --glass-bg: rgba(17, 24, 39, 0.78);
            --glass-border: rgba(255, 255, 255, 0.12);
            --glass-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #090d16;
            background: radial-gradient(circle at 50% 50%, #0d1424 0%, #060913 100%);
            background-color: #090d16;
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
            background: radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0) 70%);
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
            background: radial-gradient(circle, rgba(129, 140, 248, 0.14) 0%, rgba(129, 140, 248, 0) 70%);
            filter: blur(65px);
            z-index: 1;
            pointer-events: none;
            animation: pulseGlow 11s ease-in-out infinite alternate-reverse;
        }

        @keyframes pulseGlow {
            0% { transform: scale(0.9) translate(-15px, -15px); opacity: 0.7; }
            100% { transform: scale(1.18) translate(15px, 15px); opacity: 1; }
        }

        /* Mobile Phone (< 768px): Nonaktifkan animasi background */
        @media (max-width: 767.98px) {
            #medusa-bg-wrapper {
                display: none !important;
            }
            .ambient-glow-1, .ambient-glow-2 {
                display: none !important;
            }
        }

        /* Desktop & Tablet (>= 768px): Tampilkan animasi background */
        @media (min-width: 768px) {
            #medusa-bg-wrapper {
                display: block !important;
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
            background: transparent;
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

        /* Brand Header & Logo (Horizontal Side-by-Side) */
        .brand-header {
            margin-top: 48px;
            margin-bottom: 36px;
        }

        .brand-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            text-decoration: none;
            text-align: left;
        }

        .logo-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 58px;
            height: 58px;
            flex-shrink: 0;
            border-radius: 16px;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
            border: 1px solid rgba(59, 130, 246, 0.3);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25);
            margin-bottom: 0;
            position: relative;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .brand-link:hover .logo-wrap {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 14px 30px var(--primary-glow), inset 0 1px 1px rgba(255, 255, 255, 0.4);
        }

        .logo-icon-svg {
            width: 32px;
            height: 32px;
            color: #60a5fa;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35));
        }

        .logo-wrap img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 5px;
            filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35));
        }

        .brand-text-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
        }

        .brand-title {
            font-family: 'Outfit', sans-serif;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #ffffff;
            line-height: 1.2;
            margin-bottom: 3px;
            background: linear-gradient(135deg, #ffffff 40%, #93c5fd 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .brand-subtitle {
            font-size: 12px;
            color: #94a3b8;
            font-weight: 400;
            line-height: 1.35;
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
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(59, 130, 246, 0.25) 100%);
            border-color: rgba(96, 165, 250, 0.6);
            color: #ffffff !important;
            box-shadow: 0 8px 20px -4px rgba(59, 130, 246, 0.45), 0 0 15px rgba(96, 165, 250, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        .btn-glass-back:active {
            transform: translateY(0) scale(0.96);
        }

        /* Submit Button with Shimmer */
        .btn-submit {
            position: relative;
            width: 100%;
            height: 48px;
            background: linear-gradient(135deg, rgba(29, 78, 216, 0.85) 0%, rgba(37, 99, 235, 0.95) 50%, rgba(59, 130, 246, 0.85) 100%);
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
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5);
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
            background: linear-gradient(135deg, rgba(29, 78, 216, 0.95) 0%, rgba(37, 99, 235, 1) 50%, rgba(59, 130, 246, 0.95) 100%);
            border-color: rgba(255, 255, 255, 0.65);
            box-shadow: 0 18px 36px -6px rgba(59, 130, 246, 0.65), 0 0 24px rgba(96, 165, 250, 0.45), inset 0 1px 2px 0 rgba(255, 255, 255, 0.75);
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

    <!-- Three.js Library for Interactive Particle & Breath Mesh Animation (Offline Local First + CDN Fallback) -->
    <script src="{{ asset('vendor/three/three.min.js') }}" onerror="this.onerror=null;this.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';"></script>

    @if(!empty($recaptchaEnabled) && !empty($recaptchaSiteKey))
        <!-- Google reCAPTCHA v3 (Invisible) -->
        <script src="https://www.google.com/recaptcha/api.js?render={{ urlencode($recaptchaSiteKey) }}" async defer></script>
    @endif
</head>
<body>
    <!-- Interactive WebGL Particle Breath Mesh (PMB UNIDA Inspired Halo Effect) -->
    <div id="medusa-bg-wrapper" style="position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 2; pointer-events: none; overflow: hidden;">
        <canvas id="medusa-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: block;"></canvas>
    </div>

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
                <a href="/" class="brand-link" title="Kembali ke Beranda Eco Land">
                    <div class="logo-wrap">
                        @php
                            $currentLogo = $appLogo ?? \App\Models\AppSetting::getVal('app_logo');
                        @endphp
                        @if(!empty($currentLogo))
                            <img src="{{ asset($currentLogo) }}" alt="Logo Eco Land" class="logo-img" />
                        @else
                            <svg class="logo-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        @endif
                    </div>
                    <div class="brand-text-wrap">
                        <h1 class="brand-title">Eco Land</h1>
                        <p class="brand-subtitle">Land and Green Space Management System</p>
                    </div>
                </a>
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
                <input type="hidden" name="recaptcha_token" id="recaptcha_token" value="" />

                <!-- Input Email / Username -->
                <div>
                    <label for="username" style="display: block; font-size: 12px; font-weight: 600; color: #a7f3d0; margin-bottom: 6px;">
                        Email / User
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
                        Password
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
                    @if(!empty($recaptchaEnabled) && !empty($recaptchaSiteKey))
                        <div style="font-size: 11px; color: #64748b; text-align: center; line-height: 1.4; margin-top: 8px;">
                            Dilindungi oleh reCAPTCHA dan Google 
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style="color: #34d399; text-decoration: underline;">Kebijakan Privasi</a> serta 
                            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style="color: #34d399; text-decoration: underline;">Ketentuan Layanan</a> berlaku.
                        </div>
                    @endif
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

        // Form Submit Loading State & reCAPTCHA v3 Execution
        const formLogin = document.getElementById('form-login');
        const btnLoginSubmit = document.getElementById('btn-login-submit');
        const btnLoginText = document.getElementById('btn-login-text');
        const recaptchaTokenInput = document.getElementById('recaptcha_token');
        const recaptchaSiteKey = @json($recaptchaSiteKey ?? '');
        const recaptchaEnabled = @json(!empty($recaptchaEnabled) && !empty($recaptchaSiteKey));

        if (formLogin && btnLoginSubmit) {
            formLogin.addEventListener('submit', function (e) {
                if (recaptchaEnabled && recaptchaSiteKey && typeof window.grecaptcha !== 'undefined') {
                    // Check if token is already generated in this submit cycle
                    if (!recaptchaTokenInput.value) {
                        e.preventDefault();
                        btnLoginSubmit.disabled = true;
                        btnLoginText.textContent = 'Memverifikasi keamanan...';

                        try {
                            window.grecaptcha.ready(function () {
                                window.grecaptcha.execute(recaptchaSiteKey, { action: 'login' })
                                    .then(function (token) {
                                        recaptchaTokenInput.value = token;
                                        formLogin.submit();
                                    })
                                    .catch(function (err) {
                                        console.error('reCAPTCHA execution error:', err);
                                        btnLoginSubmit.disabled = false;
                                        btnLoginText.textContent = 'Masuk ke Eco Land';
                                        alert('Gagal memverifikasi keamanan reCAPTCHA. Silakan muat ulang halaman atau coba beberapa saat lagi.');
                                    });
                            });
                        } catch (err) {
                            console.error('reCAPTCHA ready error:', err);
                            btnLoginSubmit.disabled = false;
                            btnLoginText.textContent = 'Masuk ke Eco Land';
                            alert('Gagal memverifikasi keamanan. Silakan coba lagi.');
                        }
                        return;
                    }
                }

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

        // =========================================================================
        // ANIMASI BACKGROUND INTERAKTIF: BREATH DEAR MEDUSA (PMB UNIDA STYLE)
        // Bioluminescent Interactive Organic Particle Halo & Wave Mesh
        // =========================================================================
        (function initMedusaBackground() {
            // Tampilkan animasi background untuk Desktop dan Tablet (lebar >= 768px).
            // Hanya nonaktifkan pada smartphone / layar mobile kecil (< 768px).
            function isSmallMobileScreen() {
                return window.innerWidth < 768;
            }

            let initialized = false;
            let isRunning = false;
            let animationFrameId = null;
            let renderer = null, scene = null, camera = null, uniforms = null, config = null, clock = null;
            let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0, hasPointerMoved = false;

            function computeVisiblePlaneSize() {
                if (!camera) return { width: 1, height: 1 };
                const vFOV = (camera.fov * Math.PI) / 180;
                const h = 2 * Math.tan(vFOV / 2) * camera.position.z;
                const w = h * camera.aspect;
                return { width: w, height: h };
            }

            function animate() {
                if (!isRunning || !uniforms || !config || !renderer || !scene || !camera) return;
                animationFrameId = requestAnimationFrame(animate);

                const elapsedTime = clock.getElapsedTime();
                uniforms.uTime.value = elapsedTime;

                // Jika pengguna belum menggerakkan mouse, lakukan pergerakan ambien mengambang alami
                if (!hasPointerMoved) {
                    const plane = computeVisiblePlaneSize();
                    const naturalX = Math.sin(elapsedTime * 0.45) * (plane.width * 0.22);
                    const naturalY = Math.cos(elapsedTime * 0.55) * (plane.height * 0.18);
                    targetMouseX = naturalX;
                    targetMouseY = naturalY;
                }

                // Redaman inersia kursor halus
                mouseX += (targetMouseX - mouseX) * config.cursor.dragFactor;
                mouseY += (targetMouseY - mouseY) * config.cursor.dragFactor;
                uniforms.uMouse.value.set(mouseX, mouseY);

                renderer.render(scene, camera);
            }

            function stopAnimation() {
                if (isRunning) {
                    isRunning = false;
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            }

            function startAnimation() {
                if (!isRunning && renderer && scene && camera && uniforms && config) {
                    isRunning = true;
                    animate();
                }
            }

            function startThreeAnimation() {
                if (typeof THREE === 'undefined') {
                    setTimeout(startThreeAnimation, 50);
                    return;
                }

                // Jangan inisialisasi pada smartphone / layar mobile kecil demi performa
                if (isSmallMobileScreen()) return;
                if (initialized) {
                    startAnimation();
                    return;
                }

                const canvas = document.getElementById('medusa-canvas');
                if (!canvas) return;

                initialized = true;

                // 1. Scene, Camera, & WebGL Renderer
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.set(0, 0, 5);

                renderer = new THREE.WebGLRenderer({
                    canvas: canvas,
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance'
                });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

                // 2. Konfigurasi Parameter (BreathDearMedusa 100% Identik PMB UNIDA)
                config = {
                    cursor: { radius: 0.065, strength: 3.0, dragFactor: 0.015 },
                    halo: {
                        outerOscFrequency: 2.6,
                        outerOscAmplitude: 0.76,
                        radiusBase: 2.4,
                        radiusAmplitude: 0.5,
                        shapeAmplitude: 0.75,
                        rimWidth: 1.8,
                        outerStartOffset: 0.4,
                        outerEndOffset: 2.2,
                        scaleX: 1.3,
                        scaleY: 1.0
                    },
                    particles: {
                        baseSize: 0.022,
                        activeSize: 0.058,
                        blobScaleX: 1.0,
                        blobScaleY: 0.60,
                        rotationSpeed: 0.10,
                        rotationJitter: 0.20,
                        cursorFollowStrength: 1.0,
                        oscillationFactor: 1.0,
                        colorBase: '#0f172a',    // PMB UNIDA Deep Slate Base
                        colorOne: '#38bdf8',     // PMB UNIDA Sky Cyan
                        colorTwo: '#818cf8',     // PMB UNIDA Radiant Violet Indigo
                        colorThree: '#ffffff'    // PMB UNIDA Sparkling White Stars
                    }
                };

                // 3. Grid Partikel (90 x 50 = 4.500 Partikel Instanced Mesh)
                const cols = 90;
                const rows = 50;
                const count = cols * rows;

                const baseGeometry = new THREE.PlaneGeometry(1, 1);
                const instancedGeometry = new THREE.InstancedBufferGeometry();
                instancedGeometry.index = baseGeometry.index;
                instancedGeometry.attributes.position = baseGeometry.attributes.position;
                instancedGeometry.attributes.uv = baseGeometry.attributes.uv;

                const offsets = new Float32Array(count * 3);
                const randoms = new Float32Array(count);
                const spreadX = 42;
                const spreadY = 24;
                const jitter = 0.28;

                let ptr = 0;
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const u = c / (cols - 1);
                        const v = r / (rows - 1);
                        let px = (u - 0.5) * spreadX + (Math.random() - 0.5) * jitter;
                        let py = (v - 0.5) * spreadY + (Math.random() - 0.5) * jitter;
                        offsets[ptr * 3] = px;
                        offsets[ptr * 3 + 1] = py;
                        offsets[ptr * 3 + 2] = 0;
                        randoms[ptr] = Math.random();
                        ptr++;
                    }
                }

                instancedGeometry.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
                instancedGeometry.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randoms, 1));

                // 4. Uniforms & Shader Material (Assign ke modul uniforms)
                uniforms = {
                    uTime: { value: 0 },
                    uMouse: { value: new THREE.Vector2(0, 0) },
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uOuterOscFrequency: { value: config.halo.outerOscFrequency },
                    uOuterOscAmplitude: { value: config.halo.outerOscAmplitude },
                    uHaloRadiusBase: { value: config.halo.radiusBase },
                    uHaloRadiusAmplitude: { value: config.halo.radiusAmplitude },
                    uHaloShapeAmplitude: { value: config.halo.shapeAmplitude },
                    uHaloRimWidth: { value: config.halo.rimWidth },
                    uHaloOuterStartOffset: { value: config.halo.outerStartOffset },
                    uHaloOuterEndOffset: { value: config.halo.outerEndOffset },
                    uHaloScaleX: { value: config.halo.scaleX },
                    uHaloScaleY: { value: config.halo.scaleY },
                    uParticleBaseSize: { value: config.particles.baseSize },
                    uParticleActiveSize: { value: config.particles.activeSize },
                    uBlobScaleX: { value: config.particles.blobScaleX },
                    uBlobScaleY: { value: config.particles.blobScaleY },
                    uParticleRotationSpeed: { value: config.particles.rotationSpeed },
                    uParticleRotationJitter: { value: config.particles.rotationJitter },
                    uParticleOscillationFactor: { value: config.particles.oscillationFactor },
                    uParticleColorBase: { value: new THREE.Color(config.particles.colorBase) },
                    uParticleColorOne: { value: new THREE.Color(config.particles.colorOne) },
                    uParticleColorTwo: { value: new THREE.Color(config.particles.colorTwo) },
                    uParticleColorThree: { value: new THREE.Color(config.particles.colorThree) }
                };

                const vertexShader = `
                    uniform float uTime;
                    uniform vec2 uMouse;
                    uniform float uOuterOscFrequency;
                    uniform float uOuterOscAmplitude;
                    uniform float uHaloRadiusBase;
                    uniform float uHaloRadiusAmplitude;
                    uniform float uHaloShapeAmplitude;
                    uniform float uHaloRimWidth;
                    uniform float uHaloOuterStartOffset;
                    uniform float uHaloOuterEndOffset;
                    uniform float uHaloScaleX;
                    uniform float uHaloScaleY;
                    uniform float uParticleBaseSize;
                    uniform float uParticleActiveSize;
                    uniform float uBlobScaleX;
                    uniform float uBlobScaleY;
                    uniform float uParticleRotationSpeed;
                    uniform float uParticleRotationJitter;
                    uniform float uParticleOscillationFactor;
                    varying vec2 vUv;
                    varying float vSize;
                    varying vec2 vPos;

                    attribute vec3 aOffset;
                    attribute float aRandom;

                    #define PI 3.14159265359

                    float hash(vec2 p) {
                        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
                    }
                    float noise(vec2 p) {
                        vec2 i = floor(p);
                        vec2 f = fract(p);
                        f = f * f * (3.0 - 2.0 * f);
                        float a = hash(i);
                        float b = hash(i + vec2(1.0, 0.0));
                        float c = hash(i + vec2(0.0, 1.0));
                        float d = hash(i + vec2(1.0, 1.0));
                        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                    }

                    void main() {
                        vUv = uv;
                        vec3 pos = aOffset;
                        float driftSpeed = uTime * 0.16;

                        float dx = sin(driftSpeed + pos.y * 0.45) + sin(driftSpeed * 0.5 + pos.y * 1.8);
                        float dy = cos(driftSpeed + pos.x * 0.45) + cos(driftSpeed * 0.5 + pos.x * 1.8);
                        pos.x += dx * 0.25;
                        pos.y += dy * 0.25;

                        vec2 relToMouse = pos.xy - uMouse;
                        vec2 haloScale = max(vec2(uHaloScaleX, uHaloScaleY), vec2(0.0001));
                        float distFromMouse = length(relToMouse / haloScale);
                        vec2 dirToMouse = normalize(relToMouse + vec2(0.0001, 0.0));

                        float shapeFactor = noise(dirToMouse * 2.0 + vec2(0.0, uTime * 0.1));
                        float breathCycle = sin(uTime * 0.85);
                        float baseRadius = uHaloRadiusBase + breathCycle * uHaloRadiusAmplitude;
                        float currentRadius = baseRadius + (shapeFactor * uHaloShapeAmplitude);

                        float dist = distFromMouse;
                        float rimInfluence = smoothstep(uHaloRimWidth, 0.0, abs(dist - currentRadius));

                        vec2 pushDir = normalize(relToMouse + vec2(0.0001, 0.0));
                        float pushAmt = (breathCycle * 0.5 + 0.5) * 0.55;
                        pos.xy += pushDir * pushAmt * rimInfluence;
                        pos.z += rimInfluence * 0.35 * sin(uTime);

                        float outerInfluence = smoothstep(baseRadius + uHaloOuterStartOffset, baseRadius + uHaloOuterEndOffset, dist);
                        float outerOsc = sin(uTime * uOuterOscFrequency + pos.x * 0.6 + pos.y * 0.6);
                        pos.xy += normalize(relToMouse + vec2(0.0001, 0.0)) * outerOsc * uOuterOscAmplitude * outerInfluence;

                        float baseSize = uParticleBaseSize + (sin(uTime + pos.x) * 0.003);
                        float currentScale = baseSize + (rimInfluence * uParticleActiveSize);
                        float stretch = rimInfluence * 0.02;

                        vec3 transformed = position;
                        transformed.x *= (currentScale + stretch) * uBlobScaleX;
                        transformed.y *= currentScale * uBlobScaleY;

                        vSize = rimInfluence;
                        vPos = pos.xy;

                        float dirLen = max(length(relToMouse), 0.0001);
                        vec2 dir = relToMouse / dirLen;
                        float oscPhase = aRandom * 6.28318530718;
                        float osc = 0.5 + 0.5 * sin(uTime * (0.25 + uParticleOscillationFactor * 0.35) + oscPhase);
                        float speedScale = mix(0.55, 1.35, osc) * (0.8 + uParticleOscillationFactor * 0.2);
                        float jitterScale = mix(0.7, 1.45, osc) * (0.85 + uParticleOscillationFactor * 0.15);
                        float jitter = sin(uTime * uParticleRotationSpeed * speedScale + pos.x * 0.35 + pos.y * 0.35) * (uParticleRotationJitter * jitterScale);
                        vec2 perp = vec2(-dir.y, dir.x);
                        vec2 jitteredDir = normalize(dir + perp * jitter);
                        mat2 rot = mat2(jitteredDir.x, jitteredDir.y, -jitteredDir.y, jitteredDir.x);
                        transformed.xy = rot * transformed.xy;

                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + transformed, 1.0);
                    }
                `;

                const fragmentShader = `
                    uniform float uTime;
                    uniform vec3 uParticleColorBase;
                    uniform vec3 uParticleColorOne;
                    uniform vec3 uParticleColorTwo;
                    uniform vec3 uParticleColorThree;
                    varying vec2 vUv;
                    varying float vSize;
                    varying vec2 vPos;

                    void main() {
                        vec2 center = vec2(0.5);
                        vec2 pos = abs(vUv - center) * 2.0;

                        float d = pow(pow(pos.x, 2.6) + pow(pos.y, 2.6), 1.0 / 2.6);
                        float alpha = 1.0 - smoothstep(0.8, 1.0, d);

                        if (alpha < 0.01) discard;

                        vec3 cBase = uParticleColorBase;
                        vec3 cOne = uParticleColorOne;
                        vec3 cTwo = uParticleColorTwo;
                        vec3 cThree = uParticleColorThree;

                        float t = uTime * 1.25;
                        float p1 = sin(vPos.x * 0.8 + t);
                        float p2 = sin(vPos.y * 0.8 + t * 0.8 + p1);

                        vec3 activeColor = mix(cOne, cTwo, p1 * 0.5 + 0.5);
                        activeColor = mix(activeColor, cThree, p2 * 0.5 + 0.5);

                        vec3 finalColor = mix(cBase, activeColor, smoothstep(0.05, 0.75, vSize));
                        float finalAlpha = alpha * mix(0.52, 0.98, vSize);

                        gl_FragColor = vec4(finalColor, finalAlpha);
                    }
                `;

                const material = new THREE.ShaderMaterial({
                    uniforms: uniforms,
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    transparent: true,
                    depthWrite: false
                });

                const mesh = new THREE.InstancedMesh(instancedGeometry, material, count);
                scene.add(mesh);

                // 5. Interaksi Kursor Dinamis (Mouse Desktop & Touch Tablet)
                const updatePointerPos = (clientX, clientY) => {
                    if (isSmallMobileScreen()) return;
                    hasPointerMoved = true;
                    const normX = (clientX / window.innerWidth) * 2 - 1;
                    const normY = -(clientY / window.innerHeight) * 2 + 1;
                    const plane = computeVisiblePlaneSize();
                    targetMouseX = (normX * plane.width) / 2;
                    targetMouseY = (normY * plane.height) / 2;
                };

                window.addEventListener('pointermove', (e) => {
                    updatePointerPos(e.clientX, e.clientY);
                }, { passive: true });

                window.addEventListener('touchmove', (e) => {
                    if (e.touches && e.touches[0]) {
                        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
                    }
                }, { passive: true });

                // 6. Inisialisasi Clock & Render Loop
                clock = new THREE.Clock();
                startAnimation();
            }

            // 7. Responsive Window Resize & Device Toggle (Aktif pada Desktop & Tablet >= 768px)
            window.addEventListener('resize', () => {
                const wrapper = document.getElementById('medusa-bg-wrapper');
                if (isSmallMobileScreen()) {
                    stopAnimation();
                    if (wrapper) wrapper.style.display = 'none';
                } else {
                    if (wrapper) wrapper.style.display = 'block';
                    if (!initialized) {
                        startThreeAnimation();
                    } else if (renderer && camera && uniforms) {
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(window.innerWidth, window.innerHeight);
                        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
                        uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
                        startAnimation();
                    }
                }
            }, { passive: true });

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    if (!isSmallMobileScreen()) startThreeAnimation();
                });
            } else {
                if (!isSmallMobileScreen()) startThreeAnimation();
            }
        })();
    </script>
</body>
</html>
