((userController, userRepo, mongoose, commonServ) => {

    userController.getAll = (req, res) => {
        userRepo.get({}, 0, (response) => {
            res.json(response);
        });
    }

    userController.getById = (req, res) => {
        const { id } = req.params;
        userRepo.get({ _id: mongoose.Types.ObjectId(id) }, 1, (response) => {
            res.json(response);
        });
    }

    userController.getByEmail = (req, res) => {
        const query = { email: req.params.email };
        userRepo.get(query, 1, (response) => {
            res.json(response);
        });
    }

    userController.create = (req, res) => {
        let newUser = {
            email: req.body.email,
            pass: req.body.pass,
            name: req.body.name,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            docType: req.body.docType,
            document: req.body.document,
            cel: req.body.cel
        };

        userRepo.create(newUser, (response) => {
            if (response.success) {
                sendUserEmail(response.output.name, response.output.email)
            }
            res.json(response);
        });
    }

    userController.update = (req, res) => {
        let user = {
            email: req.body.email,
            pass: req.body.pass,
            name: req.body.name,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            docType: req.body.docType,
            document: req.body.document,
            cel: req.body.cel
        };
        userRepo.update(req.params.id, user, (response) => {
            res.json(response);
        });
    }

    userController.delete = (req, res) => {
        userRepo.delete(req.params.id, (response) => {
            res.json(response);
        });
    }

    const sendUserEmail = (name, to) => {
        const htmlContent = "<div style='width:100px;height:100px;background:rgb(29, 172, 255)'>Buenos días " + name +" </div>";

        commonServ.sendEmail(
            'Occupapp wellcome',
            'dani.uribe25@gmail.com', to,
            htmlContent, '', (result) => {
                return result;
            })
    };

})(
    module.exports,
    require('../repository/userRepo'),
    require('mongoose'),
    require('../services/commonServices'),
)