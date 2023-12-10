// This file is MIT Licensed.
//
// Copyright 2017 Christian Reitwiessner
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
pragma solidity ^0.8.0;

library Pairing {
    struct G1Point {
        uint X;
        uint Y;
    }
    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }

    /// @return the generator of G1
    function P1() internal pure returns (G1Point memory) {
        return G1Point(1, 2);
    }

    /// @return the generator of G2
    function P2() internal pure returns (G2Point memory) {
        return
            G2Point(
                [
                    10857046999023057135944570762232829481370756359578518086990519993285655852781,
                    11559732032986387107991004021392285783925812861821192530917403151452391805634
                ],
                [
                    8495653923123431417604973247489272438418190587263600148770280649306958101930,
                    4082367875863433681332203403145435568316851327593401208105741076214120093531
                ]
            );
    }

    /// @return the negation of p, i.e. p.addition(p.negate()) should be zero.
    function negate(G1Point memory p) internal pure returns (G1Point memory) {
        // The prime q in the base field F_q for G1
        uint q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
        if (p.X == 0 && p.Y == 0) return G1Point(0, 0);
        return G1Point(p.X, q - (p.Y % q));
    }

    /// @return r the sum of two points of G1
    function addition(
        G1Point memory p1,
        G1Point memory p2
    ) internal view returns (G1Point memory r) {
        uint[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success
            case 0 {
                invalid()
            }
        }
        require(success);
    }

    /// @return r the product of a point on G1 and a scalar, i.e.
    /// p == p.scalar_mul(1) and p.addition(p) == p.scalar_mul(2) for all points p.
    function scalar_mul(
        G1Point memory p,
        uint s
    ) internal view returns (G1Point memory r) {
        uint[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success
            case 0 {
                invalid()
            }
        }
        require(success);
    }

    /// @return the result of computing the pairing check
    /// e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
    /// For example pairing([P1(), P1().negate()], [P2(), P2()]) should
    /// return true.
    function pairing(
        G1Point[] memory p1,
        G2Point[] memory p2
    ) internal view returns (bool) {
        require(p1.length == p2.length);
        uint elements = p1.length;
        uint inputSize = elements * 6;
        uint[] memory input = new uint[](inputSize);
        for (uint i = 0; i < elements; i++) {
            input[i * 6 + 0] = p1[i].X;
            input[i * 6 + 1] = p1[i].Y;
            input[i * 6 + 2] = p2[i].X[1];
            input[i * 6 + 3] = p2[i].X[0];
            input[i * 6 + 4] = p2[i].Y[1];
            input[i * 6 + 5] = p2[i].Y[0];
        }
        uint[1] memory out;
        bool success;
        assembly {
            success := staticcall(
                sub(gas(), 2000),
                8,
                add(input, 0x20),
                mul(inputSize, 0x20),
                out,
                0x20
            )
            // Use "invalid" to make gas estimation work
            switch success
            case 0 {
                invalid()
            }
        }
        require(success);
        return out[0] != 0;
    }

    /// Convenience method for a pairing check for two pairs.
    function pairingProd2(
        G1Point memory a1,
        G2Point memory a2,
        G1Point memory b1,
        G2Point memory b2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](2);
        G2Point[] memory p2 = new G2Point[](2);
        p1[0] = a1;
        p1[1] = b1;
        p2[0] = a2;
        p2[1] = b2;
        return pairing(p1, p2);
    }

    /// Convenience method for a pairing check for three pairs.
    function pairingProd3(
        G1Point memory a1,
        G2Point memory a2,
        G1Point memory b1,
        G2Point memory b2,
        G1Point memory c1,
        G2Point memory c2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](3);
        G2Point[] memory p2 = new G2Point[](3);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        return pairing(p1, p2);
    }

    /// Convenience method for a pairing check for four pairs.
    function pairingProd4(
        G1Point memory a1,
        G2Point memory a2,
        G1Point memory b1,
        G2Point memory b2,
        G1Point memory c1,
        G2Point memory c2,
        G1Point memory d1,
        G2Point memory d2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](4);
        G2Point[] memory p2 = new G2Point[](4);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p1[3] = d1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        p2[3] = d2;
        return pairing(p1, p2);
    }
}

contract Verifier {
    using Pairing for *;
    struct VerifyingKey {
        Pairing.G1Point alpha;
        Pairing.G2Point beta;
        Pairing.G2Point gamma;
        Pairing.G2Point delta;
        Pairing.G1Point[] gamma_abc;
    }
    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }

    function verifyingKey() internal pure returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(
            uint256(
                0x204dc3d831eb1a19a08df235c7536e6878fd19a26a7f989c622e0c20f62836d4
            ),
            uint256(
                0x033895453a9eb37de7f67c991e0c4d35009c593a1277598b2042a20337c0d8a8
            )
        );
        vk.beta = Pairing.G2Point(
            [
                uint256(
                    0x2424eea85624245183dd5b30047220d8507b512af696e27ef40ca76137630d96
                ),
                uint256(
                    0x05363c19b9750f6e066ba475f3ffa047cb5a0f2914d147bf944cc558da153bc8
                )
            ],
            [
                uint256(
                    0x11ceb15d545b25cc13d7a05d646e544d822929b86c48fa8c9441c38e2271bb28
                ),
                uint256(
                    0x188023572be94281b08a4e90ce2772cdb5ca4b4d212275ced2ac7ef0d2173b92
                )
            ]
        );
        vk.gamma = Pairing.G2Point(
            [
                uint256(
                    0x22dbf462b0bced1446ece63ddaaf013bc801ce4e45dd5b4ef96f624aac73e494
                ),
                uint256(
                    0x084af8cbcf13136f900c78f14699fd6eaad9cd71a57cdbfb1f55cd4b80d7a0eb
                )
            ],
            [
                uint256(
                    0x1ac44e6212d0d663378a1e52b8150a467ed8f092840bfd1b75bf0c96c8e0df4c
                ),
                uint256(
                    0x20582666d9416dcf8dd5ffca07f586ffef0af33a511a0447980442bd9a83624a
                )
            ]
        );
        vk.delta = Pairing.G2Point(
            [
                uint256(
                    0x03662fc3e139182b4e16add2a827cd513138399080572a9fb8f2bd1d9a106f4e
                ),
                uint256(
                    0x1c63e9cb99a0195c455d5c2e22912b85fe039f8fedecd3f5c1b6141e6c535234
                )
            ],
            [
                uint256(
                    0x04bdc1268aa150a30ab927624ebd1f861dff892aa8b95faac0404a43efcf48cd
                ),
                uint256(
                    0x2d3f76a3e0dd8ebb58c3dd43b3e8f2ba5a6df231adbaef921f2acdd7c810e2f0
                )
            ]
        );
        vk.gamma_abc = new Pairing.G1Point[](5);
        vk.gamma_abc[0] = Pairing.G1Point(
            uint256(
                0x0b8dd22d43aafa817ec3c9b6011e202ba2dab08078718439e53575200bee717f
            ),
            uint256(
                0x102ba4276e045e4c0d2686880dc8339a2c64cfb947a32b711256a88f46220424
            )
        );
        vk.gamma_abc[1] = Pairing.G1Point(
            uint256(
                0x2d9272b13c1085e989ca76704ffa855acf786236d568989fc3c765447e0d3dfa
            ),
            uint256(
                0x28f315dd9dc02e0ac71bf539c30a0a032ef53c7ffbf0780322ecf8e26bf0c887
            )
        );
        vk.gamma_abc[2] = Pairing.G1Point(
            uint256(
                0x0587884de352b4c97b827e9ca993f55830a8f4eee0e00e33c49949b75ed330e1
            ),
            uint256(
                0x28273a3c21763fdde61d5fed06ff8fa6a9fb02f52a52759684646ba4d53d7393
            )
        );
        vk.gamma_abc[3] = Pairing.G1Point(
            uint256(
                0x1b59033ac53038b3365f2c44aa33eb86466ee13299f87e3e430ca4ffda464849
            ),
            uint256(
                0x170b4beb78e1b5d560820f7802e38af2efe230b1173fbb3319ede6552d81564d
            )
        );
        vk.gamma_abc[4] = Pairing.G1Point(
            uint256(
                0x2b3bdcf7c866c94247e7fcc56f4c19d5b2af02f8210020b59250904736373ac2
            ),
            uint256(
                0x2a7d28a94f01fcc176f084df02e74e6c48898def19f59beef1a8a886993ac307
            )
        );
    }

    function verify(
        uint[] memory input,
        Proof memory proof
    ) internal view returns (uint) {
        uint256 snark_scalar_field = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
        VerifyingKey memory vk = verifyingKey();
        require(input.length + 1 == vk.gamma_abc.length);
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        for (uint i = 0; i < input.length; i++) {
            require(input[i] < snark_scalar_field);
            vk_x = Pairing.addition(
                vk_x,
                Pairing.scalar_mul(vk.gamma_abc[i + 1], input[i])
            );
        }
        vk_x = Pairing.addition(vk_x, vk.gamma_abc[0]);
        if (
            !Pairing.pairingProd4(
                proof.a,
                proof.b,
                Pairing.negate(vk_x),
                vk.gamma,
                Pairing.negate(proof.c),
                vk.delta,
                Pairing.negate(vk.alpha),
                vk.beta
            )
        ) return 1;
        return 0;
    }

    function verifyTx(
        Proof memory proof,
        uint[4] memory input
    ) public view returns (bool r) {
        uint[] memory inputValues = new uint[](4);

        for (uint i = 0; i < input.length; i++) {
            inputValues[i] = input[i];
        }
        if (verify(inputValues, proof) == 0) {
            return true;
        } else {
            return false;
        }
    }
}
