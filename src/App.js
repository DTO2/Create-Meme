import './App.css' 
import React, {Component} from "react"

class App extends Component {
  constructor () {
    super()
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImg: []
    }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

    }

    
  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response=> {
      const {memes} = response.data
      this.setState({ allMemeImg: memes })
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const randomNumber = Math.floor(Math.random() * this.state.allMemeImg.length)
    const randomMemeImage = this.state.allMemeImg[randomNumber].url
    this.setState({ randomImg: randomMemeImage })

  }


  handleChange(event) {
    const {name, value} = event.target
    this.setState({ [name] : value})
    
  }

 
  render() {
    return (
      <div className="memeGenerator">
        <header>
        <h1 className="title"> Meme Generator </h1>
        </header>
        
        <form className="form" onSubmit= {this.handleSubmit}>
          <input type="text" placeholder="Top Text" name="topText" value={this.state.topText} onChange={this.handleChange}/>
          <input type="text" placeholder="Bottom Text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange}/>
          <button>Generate Meme</button>
        </form>
        
        <div className="meme">
          <img className="image" src={this.state.randomImg} alt="randomImage" />
          <h2 className="topText">{this.state.topText}</h2>
          <h2 className="bottomText">{this.state.bottomText}</h2>
        </div>
        
        
      </div>
    )
  }
}

export default App;