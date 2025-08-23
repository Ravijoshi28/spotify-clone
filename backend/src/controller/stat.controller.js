import { Song } from "../database/songs.model.js";
import { User } from "../database/user.model.js";
import { Album } from "../database/album.model.js";

export const countSong = async (req, res, next) => {
  try {
    const [totalUser, totalSong, totalAlbum, uniqueArtist] = await Promise.all([
      User.countDocuments(),
      Song.countDocuments(),
      Album.countDocuments(),

      Song.aggregate([
        {
          $unionWith: {
            coll: "albums", 
            pipeline: []
          }
        },
        {
          $group: {
            _id: "$artist"
          }
        },
        {
          $count: "count"
        }
      ])
    ]);

    res.status(200).json({
      totalAlbum,
      totalSong,
      totalUser,
      totalArtist: uniqueArtist[0]?.count || 0
    });

    
  } catch (error) {
    console.log("error in count", error);
    next(error);
  }
};
