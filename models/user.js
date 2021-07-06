const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todo: {
        items: [
            {
                label: String,
                important: Boolean,
                done: Boolean,
                id: Schema.ObjectId
            }
        ]
    }
});

userSchema.methods.addItem = function (item) {
    const { label, done, important } = item;
    let items = this.todo.items;
    items.push({
        label,
        important,
        done
    });

    return this.save();
}

userSchema.methods.removeItem = function (itemID) {
    const { id } = itemID;

    let items = this.todo.items;

    console.log(id, 'ID');
    const idx = items.findIndex(item => item._id.toString() === id.toString());
    console.log(idx, 'IDX');

    console.log(items, 'ITEMSsssssssssssssss')
    console.log(items[idx], 'CANDIDATE');

    items = [
        ...items.slice(0, idx),
        ...items.slice(idx + 1)
    ];

    this.todo.items = items;
    return this.save();
}

userSchema.methods.updateProp = function (data) {
    const { id, prop } = data;

    const items = this.todo.items;

    const idx = items.findIndex(item => item._id.toString() === id.toString());
    const oldItem = items[idx];
    oldItem[prop] = !oldItem[prop]

    this.todo.items = items;
    return this.save();
}


// TODO
// userSchema.method('toClient', function () {
//     const item = this.toObject()
//
//     item.id = item._id;
//     delete item._id;
//
//     return item;
// })


module.exports = model('User', userSchema);