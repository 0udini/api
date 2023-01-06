let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
// function getAssignments(req, res){
//     Assignment.find((err, assignments) => {
//         if(err){
//             res.send(err)
//         }

//         res.send(assignments);
//     });
// }

//Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    console.log("GET assignment recu : " + req.params.id);
    var mongoose = require('mongoose');
    let assignmentId = mongoose.Types.ObjectId(req.params.id);

    Assignment.findOne({_id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

function getAllAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err);
        }
        res.json(assignments);
    })
}

function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(aggregateQuery, {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    }, (err, assignments) => {
        if(err){
            res.send(err);
        }
        res.send(assignments);
    });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    var mongoose = require('mongoose');
    assignment._id = mongoose.Types.ObjectId();
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.auteur = req.body.auteur;
    assignment.note = req.body.note;
    assignment.remarque = req.body.remarque;
    assignment.boiteDeRendu = req.body.boiteDeRendu;

    console.log("Ass note", assignment.note)
    

    assignment.save( (err) => {
        if(err){
            res.status(400).send(err)
        } else {
            
            res.status(200).json({ message: `${assignment.nom} saved!` });
        }
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    console.log("DELETE recu assignment : " + req.params.id);
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getAllAssignments };
