<?php
    require_once("../env.php");
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if (!isset($_POST["name"], $_POST["email"], $_POST["message"], $_POST['g-recaptcha-response'])) {
            http_response_code(400);
            exit(2);
        }
        // Honeypot, if set, that is a bot
        if (isset($_POST["pseudo"]) && strlen($_POST["pseudo"]) > 0) {
            http_response_code(403);
            exit(6);
        }
        $name = trim($_POST["name"]);
        $email = trim($_POST["email"]);
        $message = trim($_POST["message"]);

        // Verif reCAPTCHA
        $recaptcha_response = $_POST['g-recaptcha-response'];
        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = array('secret' => $secret_key, 'response' => $recaptcha_response);
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data),
            ),
        );
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $result_json = json_decode($result);
        if (!($result_json->success)) {
            // Invalid CAPTCHA
            http_response_code(403);
            exit(7);
        }

        if (!preg_match("/^[a-zA-ZÀ-ÿ' -]{2,50}$/", $name)) {
            // Invalid name
            http_response_code(400);
            exit(3);
        }
    
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Invalid email
            http_response_code(400);
            exit(4);
        }
    
        if (strlen($message) < 1 || strlen($message) > 1000) {
            // Invalid message
            exit(5);
        }

        $email = htmlspecialchars(filter_var($email, FILTER_SANITIZE_EMAIL));
        $message = htmlspecialchars($message);

        $to = "contact@compoz.tech";
        $subject = "Prise de contact";
        $headers = "From: contact@compoz.tech" . "\r\n" .
                "Reply-To: $email" . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

        $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";

        mail($to, $subject, $body, $headers);
    } else {
        http_response_code(403);
        exit(1);
    }
?>