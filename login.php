<?php
require_once 'login/config.php';
require_once 'login/functions.php';  // This will include sendError function

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed');
}

$request = file_get_contents('php://input');
$result = json_decode($request);

if (!$result || !isset($result->type)) {
    sendError('Requisição inválida');
}

switch ($result->type) {
    case 'login':
        if (!isset($result->email) || !isset($result->password)) {
            sendError('Email e senha são obrigatórios');
        }

        try {
            $db = getDB();
            $stmt = $db->prepare('SELECT * FROM accounts WHERE email = ?');
            $stmt->execute([$result->email]);
            $account = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$account) {
                sendError('Account not found');
            }

            $calculatedHash = sha1($result->password);
            
            if ($account['password'] !== $calculatedHash) {
                sendError('Incorrect password');
            }

            $luaConfig = getLuaConfig();
            
            // Get characters
            $stmt = $db->prepare("
                SELECT p.*, a.name as account_name
                FROM players p
                JOIN accounts a ON p.account_id = a.id
                WHERE p.account_id = ? AND p.deletion = 0 
                ORDER BY p.name ASC
            ");
            
            $stmt->execute([$account['id']]);
            $characters = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Format characters
            $formattedCharacters = array_map('formatCharacter', $characters);

            // Build response
            $response = [
                'playdata' => [
                    'worlds' => [getWorldConfig($luaConfig)],
                    'characters' => $formattedCharacters
                ],
                'session' => getSessionData($account, $result)
            ];

            echo json_encode($response);
            exit;

        } catch (Exception $e) {
            sendError('Erro interno do servidor');
        }
        break;

    default:
        sendError('Tipo de requisição inválido');
}

function sendError($msg) {
    die(json_encode([
        'errorCode' => 3,
        'errorMessage' => $msg
    ]));
}