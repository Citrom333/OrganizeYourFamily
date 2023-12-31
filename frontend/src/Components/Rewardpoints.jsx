import data from "../translator.json"
export default function Rewardpoints(props) {
    const language = localStorage.getItem("language");

    return (
        <div>
            <h2>{data["Rewardpoints"][language]}</h2>
            <div className="rewardpoints">
                <h3 className="point">{data["Housework"][language]}: {props.user.rewardPointHousework}</h3>
                <h3 className="point">{data["Job"][language]}: {props.user.rewardPointJob}</h3>
                <h3 className="point">{data["School"][language]}: {props.user.rewardPointSchool}</h3>
                <h3 className="point">{data["Other"][language]}: {props.user.rewardPointOther}</h3>
            </div>
            {localStorage.getItem("isAdult") == "false" ? <div><a href="/MainFamilyPage/RewardShop"><button className="candyButton">{data["Go shop some reward"][language]}</button></a></div> : ""}

        </div>
    )
}