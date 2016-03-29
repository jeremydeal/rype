<?php

// GET /api/produce/
function getProduce()
{
    $sql = "SELECT p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.ProduceTypeID = pt.ProduceTypeID";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"products": ' . json_encode($products) . '}';
    } catch(PDOException $e) {
        echo '{"error": { "text": ' . $e->getMessage() . '} }';
    }
}

// GET /api/produce/byId/1
function getProduceById($produceId)
{
    $sql = "SELECT p.ProduceId, p.ProduceTypeID, p.Variety, p.ImgThumb, p.ImgGood, p.ImgBad,
                      p.DescSmell, p.DescSmell, p.DescLook, p.DescFeel, p.DescGeneral,
                      p.Storage, p.Prep, p.SeasonStart, p.SeasonEnd,
                      pt.CommonName, pt.ProduceClass,
                      nv.Calories, nv.Totalfat, nv.Sat, nv.Trans, nv.Cholesterol,
                      nv.Carbs, nv.Fiber, nv.Sodium, nv.Sugars,
                      nv.Protein, nv.Vitamina, nv.Vitaminc, nv.Iron
              FROM produce AS p
                JOIN produceType AS pt ON p.ProduceTypeID = pt.ProduceTypeID
                JOIN nutritionValue AS nv ON p.ProduceTypeID = nv.ProduceTypeID
                WHERE p.produceId = :produceId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("produceId", $produceId);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo '{"product": ' . json_encode($product) . '}';
    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}

// GET /api/produce/byType/1
function getProduceByType($typeId)
{
    $sql = "SELECT p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.ProduceTypeID = pt.ProduceTypeID
                WHERE p.produceTypeId = :produceTypeId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("produceTypeId", $typeId);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"products": ' . json_encode($products) . '}';
    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}