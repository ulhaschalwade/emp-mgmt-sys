const orgModel = require('./schema');
class orgServices {
    async getAllOrganisations() {
        let organisations = await orgModel.find();
        return organisations;
    }

    async getOrganisationById(id) {
        let organisation = await orgModel.findById(id);
        return organisation;
    }

    async updateOrganisationById(id, updatedObj) {
        let updatedOrganisation = await orgModel.findByIdAndUpdate(id
            , updatedObj);
        return updatedOrganisation;
    }

    async deleteOrganisationById(id) {
        let deletedOrganisation = await orgModel.findByIdAndRemove(id);
        return deletedOrganisation;
    }

    async addNewOrganisation(newObj) {
        let newOrganisation = await orgModel.create(newObj);
        return newOrganisation;
    }

    async getAllEmployeesOfAnOrg(orgId){
        let employees= await orgModel.findById(orgId).populate('employees');
        return employees;
    }
}
module.exports = new orgServices();