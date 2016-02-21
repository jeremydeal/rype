<?php

// GET /api/produceClass/
function getProduceClasses($request, $response, $args)
{
    $sql = "SELECT DISTINCT ProduceClass
              FROM produceType";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $classes = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        return $response->write('{"classes": ' . json_encode($classes) . '}');
    } catch(PDOException $e) {
        return $response->write('{"error": { "text": ' . $e->getMessage() . '} }');
    }
}