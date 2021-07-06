export default class TodoService {

    _apiBase = 'http://176.104.6.131:3000/api';

    async authUser(url, data) {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async checkIfAuth() {
        const res = await fetch(`${this._apiBase}/auth/check`, {
            method: 'POST',
            headers: {
                "Authorization": `${sessionStorage.getItem('API')}`
            }
        });
    // TODO: error boundary
        if (!res.ok) {
            throw new Error(`Could not fetch ${sessionStorage.getItem('API')}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }


    async addItem(content) {
        const res = await fetch(`${this._apiBase}/todo/add`, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${sessionStorage.getItem('API')}`
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}/todo/add` +
                `, received ${res.status}`)
        }
        return await res.json();

    }

    async removeItem(id) {
        const obj = {
            id
        }
        const res = await fetch(`${this._apiBase}/todo/${id}/remove`, {
            method: 'DELETE',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${sessionStorage.getItem('API')}`
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}/todo/${id}/remove` +
                `, received ${res.status}`)
        }
        return await res.json();

    }

    async getItems() {
        const res = await fetch(`${this._apiBase}/todo/show`, {
            method: 'GET',
            headers: {
                "Authorization": `${sessionStorage.getItem('API')}`
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}/todo/add` +
                `, received ${res.status}`)
        }
        return await res.json();

    }


    async refreshProperty(id, prop) {

        const obj = {
            id,
            prop
        }
        const res = await fetch(`${this._apiBase}/todo/update`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${sessionStorage.getItem('API')}`
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}/todo/update` +
                `, received ${res.status}`)
        }
        return await res.json();

    }


    //
    // _extractId(item) {
    //     const idRegExp = /\/([0-9]*)\/$/;
    //     return item.url.match(idRegExp)[1];
    // }
    //
    // _transformPlanet(planet) {
    //     return {
    //         id: this._extractId(planet),
    //         name: planet.name,
    //         population: planet.population,
    //         rotationPeriod: planet.rotation_period,
    //         diameter: planet.diameter
    //     };
    // }
    //
    // _transformStarship(starship) {
    //     return {
    //         id: this._extractId(starship),
    //         name: starship.name,
    //         model: starship.model,
    //         manufacturer: starship.manufacturer,
    //         costInCredits: starship.costInCredits,
    //         length: starship.length,
    //         crew: starship.crew,
    //         passengers: starship.passengers,
    //         cargoCapacity: starship.cargoCapacity
    //     }
    // }
    //
    // _transformPerson(person) {
    //     return {
    //         id: this._extractId(person),
    //         name: person.name,
    //         gender: person.gender,
    //         birthYear: person.birthYear,
    //         eyeColor: person.eyeColor
    //     }
    // }
}