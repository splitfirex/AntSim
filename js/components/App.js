var App = createReactClass({

    getInitialState() {
        return {
            screen: { width: this.props.playgroundSize.w, height: this.props.playgroundSize.h },
            context: null,
            elements: this.props.elements
        }
    },

    componentDidMount() {
        var context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });
        requestAnimationFrame(() => { this.update() });
    },

    update() {
        this.state.context.save();
        // context.scale(this.state.screen.ratio, this.state.screen.ratio);

        // Motion trail
        this.state.context.fillStyle = '#FFF';
        this.state.context.globalAlpha = 0.4;
        this.state.context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        this.state.context.globalAlpha = 1;

        // Remove or render
        this.updateObjects(this.state.elements, 'Ants')


        this.state.context.restore();

        // Next frame
        requestAnimationFrame(() => { this.update() });
    },

    updateObjects(items, group) {
        let index = 0;
        for (let item of items[group]) {
            if (item.delete) {
                this[group].splice(index, 1);
            } else {
                items[group][index].render(this.state);
            }
            index++;
        }
    },

    render() {
        return (
            <div>
                <canvas ref="canvas"
                    width={this.state.screen.width}
                    height={this.state.screen.height}
                />
            </div>
        );
    }
})

App.defaultProps = {
    playgroundSize: { h: 800, w: 1000 },
    elements: { "Ants": [new Ant()] }
}