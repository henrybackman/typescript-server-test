"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmController_1 = require("../controllers/crmController");
class Routes {
    constructor() {
        this.contactController = new crmController_1.ContactController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successful'
            });
        });
        // Contact 
        app.route('/contact')
            .get((req, res, next) => {
            // middleware          
            if (req.query.key !== '98b831cde2f78be114b5a2ada046b4fc4093f347') {
                res.status(401).send('No access');
            }
            else {
                next();
            }
        }, this.contactController.getContacts)
            .post(this.contactController.addNewContact);
        app.route('/contact/:contactId')
            // Edit contacts
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map