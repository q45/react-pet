import React from 'react';
import pf from 'petfinder-client';
import Pet from './Pet';
import { patch } from 'semver';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {

  constructor (props)  {
    super(props)
    this.state = {
      pets: []
    }
  }
  
  componentDidMount() {
    petfinder.pet.find({ output: "full", location: "Salt Lake City, UT"})
    .then(data => {
      let pets;

      if (data.petfinder.pets && data.petfinder.pets.pet) {
        if (Array.isArray(data.petfinder.pets.pet)) {
          pets = data.petfinder.pets.pet
        } else {
          pets = [data.petfinder.pets.pet];
        }
      } else {
        pets = [];
      }

      this.setState({
        pets
      });
    })
    // const promise = petfinder.breed.list({ animal: "dog" })

    // promise.then(console.log, console.error)
  }

  handleTitleClick() {
    alert("you clicked the title");
  }
  render() {
    // return React.createElement("div", {}, [
    //   React.createElement("h1", { onClick: this.handleTitleClick }, "Adopt Me"),
    //   React.createElement(Pet, {
    //     name: "Dacia",
    //     animal: "Dog",
    //     breed: "Shnauzer"
    //   }),
    //   React.createElement(Pet, {
    //     name: "Oni",
    //     animal: "Dog",
    //     breed: "Mix"
    //   }),
    //   React.createElement(Pet, {
    //     name: "Izzy",
    //     animal: "Dog",
    //     breed: "Vizsla"
    //   })
    // ]);
    return (

        <div className="search">
          {this.state.pets.map(pet => {
            let breed;
            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(', ')
            } else {
              breed = pet.breeds.breed;
            }
            return <Pet key={pet.id} animal={pet.animal} name={pet.name} breed={breed} media={pet.media} location={`${pet.contact.city}, ${pet.contact.state}`} id={pet.id} />
          })}
        </div>
    );
  }
}

export default Results;