<?php

// GET /api/produceType/
function getProduceType($request, $response, $args)
{
    $sql = "SELECT *
              FROM produceType";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $types = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        return $response->write('{"types": ' . json_encode($types) . '}');
    } catch(PDOException $e) {
        return $response->write('{"error": { "text": ' . $e->getMessage() . '} }');
    }
}

// GET /api/produceType/byId/1
function getProduceTypeById($request, $response, $args)
{
    $sql = "SELECT *
              FROM produceType
                WHERE p.produceTypeId = :produceTypeId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("produceTypeId", $args['produceTypeId']);
        $stmt->execute();
        $type = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        return $response->write('{"type": ' . json_encode($type) . '}');
    } catch (PDOException $e) {
        return $response->write('{"error: { "text": ' . $e->getMessage() . '} }');
    }
}