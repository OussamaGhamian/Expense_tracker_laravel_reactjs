<?php
function sendJson($message, $data = [])
{
    return ["data" => $data, "message" => $message];
}
