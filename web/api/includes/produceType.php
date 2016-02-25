<?php

// GET /api/produceType/
function getProduceTypes()
{
    $sql = "SELECT *
              FROM produceType";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $types = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"types": ' . json_encode($types) . '}';
    } catch(PDOException $e) {
        echo '{"error": { "text": ' . $e->getMessage() . '} }';
    }
}

// GET /api/produceType/byId/1
function getProduceTypeById($typeId)
{
    $sql = "SELECT *
              FROM produceType
                WHERE p.produceTypeId = :produceTypeId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("produceTypeId", $typeId);
        $stmt->execute();
        $type = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo '{"type": ' . json_encode($type) . '}';
    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}