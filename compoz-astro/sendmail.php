<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars($_POST["name"]);
        $email = htmlspecialchars($_POST["email"]);
        $message = htmlspecialchars($_POST["message"]);

        $to = "contact@compoz.tech";
        $subject = "Prise de contact";
        $headers = "From: $email" . "\r\n" .
                "Reply-To: $email" . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

        $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";

        mail($to, $subject, $body, $headers);
    } else {
        http_response_code(403);
        exit(1);
    }
?>