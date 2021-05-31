export const trending = (req, res) => {
  const videos = [
    {
      title:"First Video",
      rating:5,
      comments:2,
      created: "12"
    }
  ];
  return res.render("home", {pageTitle: "Home", videos});
};
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
