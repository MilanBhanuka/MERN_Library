const Librarian= require('../Models/LibrarianModel');

module.exports.createLibrarian = async (req, res, next) => {
    try {
        const {LibrarianID, Name, Email, TelephoneNum,createdAt } = req.body;
        const librarian = await Librarian.findOne({ LibrarianID });
        if (librarian) {
          return res.status(400).json({ message: "Librarian already exists" });
        }
        const CreatedLibrarian = await Librarian.create({ LibrarianID, Name, Email, TelephoneNum,createdAt });
        res
          .status(201)
          .json({ message: "Created the Librarian log successfully", success: true, CreatedLibrarian });
      } catch (error) {
        console.error(error);
      }
};

module.exports.getAllLibrarians = async (req, res, next) => {
  try {
    const librarians = await Librarian.find();
    res.status(200).json(librarians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewLibrarian = async (req, res, next) => {
    try {
      const {LibrarianID} = req.params;
  
      const librarian = await Librarian.findOne({ LibrarianID });
      if (!librarian) {
        return res.status(400).json({ message: "Librarian not found" });
      }
      res
        .status(201)
        .json({ message: "Librarian Found", success: true, librarian });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteLibrarian = async (req, res, next) => {
      try {
        const { LibrarianID} = req.params;
    
        const librarian = await Librarian.findOne({ LibrarianID });
        if (!librarian) {
          return res.status(400).json({ message: "Librarian not found" });
        }
        deletedLibrarian = await Librarian.findOneAndDelete({LibrarianID} );
        res
          .status(201)
          .json({ message: "Librarian Record Deleted", success: true, deletedLibrarian });
      } catch (error) {
        console.error(error);
      }
    };
  
  
  module.exports.updateLibrarian = async (req, res) => {
    try {
      const { LibrarianID } = req.params;
      const {  Name, Email, TelephoneNum,createdAt } = req.body;
  
      const librarian = await Librarian.findOne({ LibrarianID });
  
      if (!librarian) {
        return res.status(400).json({ message: "Librarian not found" });
      }
  
      librarian.Name= Name;
      librarian.Email= Email;
      librarian.TelephoneNum= TelephoneNum;
      librarian.createdAt= createdAt;
  
      await librarian.save();
  
      res.status(200).json({ message: "Librarian updated successfully", success: true, updatedLibrarian: librarian });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };