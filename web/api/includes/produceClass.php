<?php

// GET /api/produceClass/
function getProduceClasses()
{
    $sql = "SELECT DISTINCT ProduceClass
              FROM produceType";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $classes = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"classes": ' . json_encode($classes) . '}';
    } catch(PDOException $e) {
        echo '{"error": { "text": ' . $e->getMessage() . '} }';
    }
}