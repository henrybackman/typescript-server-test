import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/crmController";

export class Routes {    
    
    public contactController: ContactController = new ContactController();
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successful'
            })
        })
        
        // Contact 
        app.route('/contact')
        .get((req: Request, res: Response, next: NextFunction) => {
          // middleware          
          if(req.query.key !== '98b831cde2f78be114b5a2ada046b4fc4093f347'){
           res.status(401).send('No access');
          } else {
           next();
          }                        
         }, this.contactController.getContacts)
        .post(this.contactController.addNewContact)

        app.route('/contact/:contactId')
        // Edit contacts
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)
    }
}