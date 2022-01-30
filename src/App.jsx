import Clui from "./components/Clui";
import theme from "./components/theme";

const App = () => (
    <div
        css={{
            background: theme.bodyBackground,
            overflowX: "hidden",
            minHeight: "100vh",
        }}
    >
        <Clui />
    </div>
);

export default App;
