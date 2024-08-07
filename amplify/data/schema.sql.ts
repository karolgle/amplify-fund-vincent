/* eslint-disable */
/* THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import {a} from "@aws-amplify/data-schema";
import {configure} from "@aws-amplify/data-schema/internals";
import {secret} from "@aws-amplify/backend";

export const schema = configure({
    database: {
        identifier: "IDD3tJSFa5ZMxIWQnZdFeqSQ",
        engine: "postgresql",
        connectionUri: secret("SQL_CONNECTION_STRING"),
        vpcConfig: {
            vpcId: "vpc-004b83100b02b3d32",
            securityGroupIds: [
                "sg-0b10a9556c322aaf0",
                "sg-0b708fd2a1576b61e",
                "sg-0bfd5b035b9e184d0"
            ],
            subnetAvailabilityZones: [
                {
                    subnetId: "subnet-0ed85571a17a09fa9",
                    availabilityZone: "us-east-1a"
                },
                {
                    subnetId: "subnet-08c808892b2fb1a15",
                    availabilityZone: "us-east-1f"
                },
                {
                    subnetId: "subnet-04cfb8126984bc420",
                    availabilityZone: "us-east-1d"
                },
                {
                    subnetId: "subnet-05af75d1b15211a0b",
                    availabilityZone: "us-east-1b"
                },
                {
                    subnetId: "subnet-0fd25df8483f1d4bf",
                    availabilityZone: "us-east-1e"
                },
                {
                    subnetId: "subnet-0a3bbb0c96accd34a",
                    availabilityZone: "us-east-1c"
                }
            ]
        }
    }
}).schema({
    "fund": a.model({
        id: a.integer().required(),
        email: a.string().required(),
        quantity: a.integer().required(),
        amount: a.float().required(),
        price: a.float().required(),
        datetime: a.datetime().required(),
        createdAt: a.datetime(),
        updatedAt: a.datetime(),
        owner: a.string()
    }).identifier([
        "id"
    ])
});
