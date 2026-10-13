<!DOCTYPE html>
<html lang="id" class="dark h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Eco Land — Menghubungkan Sesi Administrator</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=outfit:500,600,700|inter:400,500,600&display=swap" rel="stylesheet" />
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #030805;
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
        }
        .loading-card {
            background: rgba(6, 20, 14, 0.75);
            border: 1px solid rgba(16, 185, 129, 0.25);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 36px 32px;
            text-align: center;
            max-width: 380px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.15);
        }
        .spinner {
            width: 48px;
            height: 48px;
            border: 3px solid rgba(16, 185, 129, 0.2);
            border-top-color: #10b981;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 19px;
            margin: 0 0 8px;
            color: #ffffff;
        }
        p {
            font-size: 13px;
            color: #94a3b8;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="loading-card">
        <div class="spinner"></div>
        <h2>Menghubungkan Sesi Eco Land...</h2>
        <p>Autentikasi berhasil. Mempersiapkan dasbor administrator...</p>
    </div>

    <script>
        const token = @json($token);
        const userData = @json($user);

        if (token) {
            sessionStorage.setItem('vtour_admin_token', token);
            localStorage.setItem('vtour_admin_token', token);
        }
        if (userData) {
            sessionStorage.setItem('vtour_admin_user', JSON.stringify(userData));
            localStorage.setItem('vtour_admin_user', JSON.stringify(userData));
        }

        const targetHash = sessionStorage.getItem('admin_redirect_hash') || '#admin/dashboard';
        sessionStorage.removeItem('admin_redirect_hash');

        setTimeout(() => {
            window.location.href = '/' + (targetHash.startsWith('#') ? targetHash : '#' + targetHash);
        }, 200);
    </script>
</body>
</html>
