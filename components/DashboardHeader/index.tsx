import { 
    Header, 
    WrapperLogoArea, 
    Logo, 
    OptionsArea, 
    OptionArea,
} from "./styles";

export default function DashboardHeader() {

    return (
        <Header className="flex">
            <WrapperLogoArea className="flex">
                <Logo>SatsFI</Logo>
            </WrapperLogoArea>
            <OptionsArea className="flex">
                <OptionArea></OptionArea>
            </OptionsArea>
        </Header>
    );
}