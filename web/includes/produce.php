<?php

function getProduce()
{
    $sql = "SELECT p.*, pt.*
              FROM Produce AS p
                JOIN ProduceType AS pt ON p.ProduceTypeID = pt.ProduceTypeID";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $districts = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"produce": ' . json_encode($districts) . '}';
    } catch(PDOException $e) {
        echo '{"error": { "text": ' . $e->getMessage() . '} }';
    }
}


// SAMPLE POST -- DO NOT DELETE
//
//function getDistrictById($districtId)
//{
//    $sql = "SELECT districtId, name FROM district WHERE districtId = :districtId";
//    try {
//        $db = getDB();
//        $stmt = $db->prepare($sql);
//        $stmt->bindParam("districtId", $districtId);
//        $stmt->execute();
//        $district = $stmt->fetch(PDO::FETCH_OBJ);
//        $db = null;
//        echo '{"district": ' . json_encode($district) . '}';
//    } catch (PDOException $e) {
//        echo '{"error: { "text": ' . $e->getMessage() . '} }';
//    }
//}