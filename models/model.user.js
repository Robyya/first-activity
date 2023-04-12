export default class UserModel {
    constructor({
        _id = '',
        name = [],
        email = "",
        password = "",
        contactNumber = "",
        dateOfBirth = "",
        gender = "",
        address = "",
        type = "",
        profile = "",
        status = 'active',
        dateCreated = new Date()
    } = {}) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNumber = contactNumber;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
        this.type = type;
        this.profile = profile;
        this.status = status;
        this.dateCreated = dateCreated;
    }
}