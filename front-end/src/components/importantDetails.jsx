export default function ImportantDetails() {
    return(
        <div className="award section second">
            <div className="container">
                <h1>Important<br />details</h1>
                <ul className="award-list list-flat">
                    <li>5,000,000</li>
                    <li>Max transfer allowed</li>
                    <li>The max value of tokens that can be tranferred per day</li>
                </ul>
                <ul className="award-list list-flat">
                    <li>1</li>
                    <li>Min transfer allowed</li>
                    <li>The min value of tokens that can be transferred per day</li>
                </ul>
                <ul className="award-list list-flat">
                    <li>5,000,000</li>
                    <li>Daily transfer limit</li>
                    <li>How many tokens can be tranferred today</li>
                </ul>

                <ul className="award-list list-flat">
                    <li>0.20%</li>
                    <li>Fee</li>
                    <li>This is the fee required for transfer tokens between networks</li>
                </ul>
                <ul className="award-list list-flat">
                    <li>5</li>
                    <li>Federators</li>
                    <li>The Authorities will vote the transactions to cross during the trial period. <br/>
                    Once we implement the decentralized bridge there will be <br/>
                    no authorities as its a fully trustless solution</li>
                </ul>
                <ul className="award-list list-flat">
                    <li>24 hours</li>
                    <li>Whitelisted contracts</li>
                    <li>The whitelist will be used during the trial period once<br/>
                    the decentralized bridge is released the whitelist will be removed</li>
                </ul>
            </div>
        </div>
    )
}
