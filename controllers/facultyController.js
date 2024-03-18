export const handleViewFacultyLogin = async (req, res) => {
  try {
    res.render("faculty/login");
  } catch (error) {
    res.render("error");
  }
};

export const handleViewFacultyHome = async (req, res) => {
  try {
    res.render("faculty/home");
  } catch (error) {
    res.render("error");
  }
};
