<?php
// Validasi agar hanya request dari domain Anda yang diterima
if (
    !isset($_SERVER['HTTP_ORIGIN']) || 
    $_SERVER['HTTP_ORIGIN'] !== 'https://www.rahmanweb.my.id'
) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden']);
    exit;
}

// Ambil data JSON dari body request
$data = file_get_contents("php://input");

// Kirim data ke Google Apps Script
$ch = curl_init("https://script.google.com/macros/s/AKfycbxV0pE0PCl_piF4xwtOA4_CO4Zyee3pXyWq7VL-BsUQrH2rgnzG4yFEj4HS44KrLAo5/exec");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
$response = curl_exec($ch);
curl_close($ch);

// Kirim balik respons ke browser
header("Content-Type: application/json");
echo $response;
