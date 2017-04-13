
var GiphyList = React.createClass({

  getInitialState: function(){
    return {
      listOGifs: [],
      searchTerm: this.props.searchTerm
    }
  },
  componentWillMount: function(){
      this.getGifs()
  },
  componentWillUpdate:function(){
    this.getGifs()
  },
  componentWillReceiveProps: function(){
    this.props.searchTerm
  },
  shouldComponentUpdate:function(){
    if(this.props.searchTerm != this.state.searchTerm){
      return true;
    } else {
      return false;
    }
  },
  getGifs: function(){
    console.log(this.state.searchTerm)
    $.ajax({
        method: "GET",
        url: "http://api.giphy.com/v1/gifs/search?q="+this.state.searchTerm+"&api_key=dc6zaTOxFJmzC",
        success: function(res){
          this.setState({
            listOGifs: res.data
          })
        }.bind(this)
      })
  },

  render: function(){
    var giphyNodes = this.state.listOGifs.map(function(x){
      return (
        <div key={x.id}>
          <img src={x.images.original.url}/>
        </div>
      )
    });
    return(
    <div>
      {giphyNodes}
    </div>
  );
  }
})

var GiphyPage = React.createClass({
  getInitialState: function(){
    return {
      searchTerm: "horses",
      searchValue: ""
    }
  },
  changeInput: function(e){
    this.setState({
      searchValue: e.target.value
    });
  },
  submitForm: function(e){
    e.preventDefault();
    this.setState({
      searchTerm: this.state.searchValue
    });
    // this.setState({
    //   searchValue: ""
    // });
  },
  render: function(){
    return (
      <div>
      <form onSubmit={this.submitForm}>
      <input
      onChange={this.changeInput}
      value={this.state.searchValue}
      />
      </form>
      <GiphyList searchTerm={this.state.searchTerm}/>
      </div>
    )
  }
})

ReactDOM.render(
  <GiphyPage/>,
  $('#container')[0]
)
