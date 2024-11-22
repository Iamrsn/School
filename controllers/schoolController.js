const School = require("../models/schoolModel");

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newSchool = new School({ name, address, latitude, longitude });
    const savedSchool = await newSchool.save();
    res
      .status(201)
      .json({ message: "School added successfully", school: savedSchool });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};


listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
  
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const toRadians = (degree) => (degree * Math.PI) / 180;
      const R = 6371; // Earth's radius in km
  
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) ** 2;
  
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };
  
    try {
      const schools = await School.find();
  
      const userLatitude = parseFloat(latitude);
      const userLongitude = parseFloat(longitude);
  
      const sortedSchools = schools
        .map((school) => ({
          ...school.toObject(),
          distance: calculateDistance(userLatitude, userLongitude, school.latitude, school.longitude),
        }))
        .sort((a, b) => a.distance - b.distance);
  
      res.status(200).json(sortedSchools);
    } catch (error) {
      res.status(500).json({ error: 'Database error', details: error.message });
    }
  };
  

module.exports={addSchool,listSchools};