<?php
/**
 * Virtual Tour Backend API (PHP Production / DirectAdmin Endpoint)
 * Fallback server persistence for Apache/DirectAdmin hosting.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$hotspotsFile = __DIR__ . '/data/hotspots.json';
$scenesCustomFile = __DIR__ . '/data/scenes_custom.json';

// Helper to get auth token
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : '');
$isAuthenticated = strpos($authHeader, 'admin_token_ikhw') !== false;

$action = isset($_GET['action']) ? $_GET['action'] : '';

$input = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    case 'login':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $username = isset($input['username']) ? $input['username'] : '';
            $password = isset($input['password']) ? $input['password'] : '';
            if (($username === 'admin' && $password === 'admin123') || ($username === 'ikhw_admin' && $password === 'ikhw2026')) {
                echo json_encode([
                    'success' => true,
                    'token' => 'admin_token_ikhw_session_' . time(),
                    'user' => ['username' => $username, 'role' => 'administrator', 'name' => 'Admin IKHW Aceh']
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['success' => false, 'message' => 'Username atau password admin salah!']);
            }
        }
        break;

    case 'verify':
        if ($isAuthenticated) {
            echo json_encode(['authenticated' => true, 'user' => ['username' => 'admin', 'role' => 'administrator']]);
        } else {
            http_response_code(401);
            echo json_encode(['authenticated' => false]);
        }
        break;

    case 'logout':
        echo json_encode(['success' => true, 'message' => 'Berhasil logout']);
        break;

    case 'get_hotspots':
        if (file_exists($hotspotsFile)) {
            echo file_get_contents($hotspotsFile);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'File hotspots.json tidak ditemukan']);
        }
        break;

    case 'save_hotspots':
        if (!$isAuthenticated) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Akses ditolak: Memerlukan login admin']);
            exit;
        }
        $payload = [
            'version' => isset($input['version']) ? $input['version'] : '1.1.0',
            'lastUpdated' => date('c'),
            'hotspots' => isset($input['hotspots']) && is_array($input['hotspots']) ? $input['hotspots'] : []
        ];
        if (file_put_contents($hotspotsFile, json_encode($payload, JSON_PRETTY_PRINT))) {
            echo json_encode([
                'success' => true,
                'message' => 'Data hotspot berhasil disimpan permanen di server',
                'count' => count($payload['hotspots']),
                'lastUpdated' => $payload['lastUpdated']
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Gagal menulis file hotspots.json di server']);
        }
        break;

    case 'export_backup':
        if (!$isAuthenticated) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Akses ditolak']);
            exit;
        }
        $content = file_exists($hotspotsFile) ? json_decode(file_get_contents($hotspotsFile), true) : ['hotspots' => []];
        $backupData = [
            'exportType' => 'marzipano_hotspots_backup',
            'version' => '1.1.0',
            'exportedAt' => date('c'),
            'project' => 'Virtual Tour Kawasan Penanaman Pohon ±2 Hektare Aceh',
            'totalHotspots' => count($content['hotspots']),
            'data' => $content
        ];
        echo json_encode($backupData, JSON_PRETTY_PRINT);
        break;

    case 'import_backup':
        if (!$isAuthenticated) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Akses ditolak']);
            exit;
        }
        $hotspotsList = [];
        if (isset($input['hotspots']) && is_array($input['hotspots'])) {
            $hotspotsList = $input['hotspots'];
        } else if (isset($input['data']['hotspots']) && is_array($input['data']['hotspots'])) {
            $hotspotsList = $input['data']['hotspots'];
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Format file cadangan tidak valid']);
            exit;
        }
        $payload = [
            'version' => '1.1.0',
            'lastUpdated' => date('c'),
            'hotspots' => $hotspotsList
        ];
        file_put_contents($hotspotsFile, json_encode($payload, JSON_PRETTY_PRINT));
        echo json_encode([
            'success' => true,
            'message' => 'Berhasil memulihkan ' . count($hotspotsList) . ' hotspot!',
            'count' => count($hotspotsList)
        ]);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Aksi tidak dikenal']);
        break;
}
