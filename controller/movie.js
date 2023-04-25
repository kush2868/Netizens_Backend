const MovieModel = require("../model/movie");

exports.GetAll = async (req, res) => {


    let movies = await MovieModel.find({});

    res.json({
        status: 200,
        result: movies.length,
        data: movies,
    });
};



exports.GetById = async (req, res) => {

    const movie = await MovieModel.findById(req.params.id);

    if (movie.length == 0) {
        res.json({
            status: 200,
            message: "Invaild id",
        });
    } else {
        res.json({
            status: 201,
            data: movie
        });
    }
};

exports.Create = async (req, res) => {


    let movie = new MovieModel(req.body);
    movie.save().then((result) =>
        res.status(201).json({
            message: "Created successfully",
            status: 201,
            data: result,
        })
    ).catch((err) => {
        res.json({
            error: err,
            status: 411,
        });
    });

};

exports.Update = async (req, res, next) => {

    const oldData = await MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(201).json({
        message: "updated successfully",
        status: 201,
        data: oldData,
    })
};

exports.delete = async (req, res) => {

    const oldData = await MovieModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
        message: "deleted successfully",
        status: 201,
        data: oldData,
    })

};
