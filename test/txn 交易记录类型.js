// {"finalized_txn":{"txn":{"body":{"operations":[{"IssueAsset":  增发资产

/**
 * 这是一条 生成资产的 数据类型
 */
const DefineAsset = {
  finalized_txn: {
    txn: {
      body: {
        operations: [
          {
            DefineAsset: {
              body: {
                asset: {
                  code: 'qgS8BVRRDIi6hrasE0pg7Q==',
                  issuer: {
                    key: 'a1YtM_SttzL50DjGEsFIAjCflYVuWjQAWhwOwlrfH1o=',
                  },
                  memo: 'one memo zhipan test',
                  asset_rules: {
                    traceable: false,
                    transferable: false,
                    updatable: false,
                    transfer_multisig_rules: null,
                    max_units: 6000,
                  },
                },
              },
              pubkey: {
                key: 'a1YtM_SttzL50DjGEsFIAjCflYVuWjQAWhwOwlrfH1o=',
              },
              signature: 'IiG-ogwm2Nu1BW449sVr3Ny0w73iOCNEm6j9ua3NSV6keFOweOnCX9qrqeNPqd21WBITT1Ukes6juQgTyfnDDQ==',
            },
          },
        ],
      },
      seq_id: 82,
    },
    tx_id: 83,
    merkle_id: 83,
  },
};

/**
 * 这是一条 增发资产的 数据类型
 */

const IssueAsset = {
  finalized_txn: {
    txn: {
      body: {
        operations: [
          {
            IssueAsset: {
              body: {
                code: '8XbNsa7uMpimYlcXExxuIA==',
                seq_num: 89,
                num_outputs: 1,
                records: [
                  [
                    {
                      amount: { NonConfidential: 1000 },
                      asset_type: {
                        NonConfidential: [241, 118, 205, 177, 174, 238, 50, 152, 166, 98, 87, 23, 19, 28, 110, 32],
                      },
                      public_key: 'a1YtM_SttzL50DjGEsFIAjCflYVuWjQAWhwOwlrfH1o=',
                    },
                    null,
                  ],
                ],
              },
              pubkey: {
                key: 'a1YtM_SttzL50DjGEsFIAjCflYVuWjQAWhwOwlrfH1o=',
              },
              signature: '7spvJQgTAJ5XHHDOnj5dMeBIKsuOVSjrSOrSUsnv6w5At-eI6oaNz0R4qJR1_a5vDquNb-jFFqksyahuhg5IBw==',
            },
          },
        ],
      },
      seq_id: 88,
    },
    tx_id: 89,
    merkle_id: 89,
  },
};

/**
 * 这是一条 交易资产的 数据类型
 */
const TransferAsset = {
  TransferAsset: {
    body: {
      inputs: [{ Relative: 0 }],
      input_identity_commitments: [null],
      outputs: [
        {
          amount: { NonConfidential: 1000 },
          asset_type: {
            NonConfidential: [162, 72, 51, 159, 221, 60, 71, 203, 230, 96, 207, 120, 194, 50, 67, 228],
          },
          public_key: 'Wpe2aOvQoGGxtoKUEHfPeg4c8BqxWlRst4wDNg3vlAY=',
        },
      ],
      output_identity_commitments: [null],
      transfer: {
        inputs: [
          {
            amount: {
              Confidential: [
                [
                  36,
                  112,
                  170,
                  159,
                  35,
                  0,
                  154,
                  115,
                  191,
                  158,
                  84,
                  98,
                  172,
                  25,
                  90,
                  26,
                  56,
                  34,
                  167,
                  200,
                  232,
                  38,
                  224,
                  213,
                  235,
                  10,
                  83,
                  67,
                  179,
                  48,
                  228,
                  38,
                ],
                [
                  80,
                  96,
                  142,
                  34,
                  38,
                  233,
                  178,
                  134,
                  57,
                  41,
                  98,
                  14,
                  147,
                  119,
                  193,
                  28,
                  137,
                  65,
                  75,
                  201,
                  2,
                  79,
                  133,
                  11,
                  242,
                  71,
                  72,
                  204,
                  245,
                  206,
                  13,
                  23,
                ],
              ],
            },
            asset_type: {
              NonConfidential: [162, 72, 51, 159, 221, 60, 71, 203, 230, 96, 207, 120, 194, 50, 67, 228],
            },
            public_key: '9SGftMKATLtb5z-Q7tfG3qnIwR7z7BquLjJcOZHdIE8=',
          },
        ],
        outputs: [
          {
            amount: { NonConfidential: 1000 },
            asset_type: {
              NonConfidential: [162, 72, 51, 159, 221, 60, 71, 203, 230, 96, 207, 120, 194, 50, 67, 228],
            },
            public_key: 'Wpe2aOvQoGGxtoKUEHfPeg4c8BqxWlRst4wDNg3vlAY=',
          },
        ],
        proofs: {
          asset_type_and_amount_proof: {
            ConfAmount: {
              range_proof:
                'AOpjWz77e1_dObVRvU-D-t_uiFqLtidHVeV3CHnNFEZsKZb0w-eY2rAXR46PD0YPjOrV7ncrdo88194--deQSuBfH_vCe5W94cYwBUf0BJD2IgSpsAS7_6U2x5xM8zVlfq4FLn217XjVKQMOi6RrUlI59zeM8JY5yfrRQSdoJDn2W6sQzGnoVz4MOqdD2tsuSMEL5lOWp2s7AYSdRW9sCrwvZgcw39u2o_uA69svhpZI3DOAlp2VwgSGByHLnsAEDGAE7a1yiLv6hOAL2H4JU_1xGkRQZXLNhIid5TZ4ewIcWofo8z1TpD_syDJ48TMjP4R3sRFJ7mrdPtdEt_PXVLhGAROIoBL8Va27SyLs0hdqLx7NfBGhJ4bzPGxlSOYFKMuLmLUPJKb0Rdix6aXJGKJrxmXGQPBQWMKLLth4jB8wRYA8TFAuAoBDwvnnqIZhx1oM3UjCWYJwShCGfJg-CIwyks7R_fFuKZwuxkzk_e6BkuohsV-596WyKltYi4YyQAtqEaBCIkjOM8t3YZAyBMGOWFdUOsm0uyLPxqciQjFK-ViDAEiXY9NyJv5aZUc_okgamBgQkuDwHTtKg2ele34O4GMtNbIZtP_SbVQfKVHuZ9wUaCSectcVknYIAi9yeKOxZddR8Dc7-gPbdsFcUYwptZw59WePvnqKjiT3wi_0XdVJbbTHEreJMnrbHt192ODgHvDLjl3q0z-GlQE6RTZXhqUZJfdygJcEmpTnoDSIS6Bp6JCqFqp9r-fOCutJxCpuwjHMcEm5RGYlq3jIN5owi6PBWb3LftqZWJ-EIgdSnchaHdO33xCL66l0ftLMEy-Rli9mtD-5GrrOO9_sZA4-cd2MhSPAsah1eLula-wR4gZg7wu0Et6f0e6j6rJm3zt990n1rThu-0iM65goAkPZUdsy6LYMh5T2aGJygQD55SFY1UCHFjn81H7VMMXxA-xmV44GXvpGEk0YPQdWCw==',
              xfr_diff_commitment_low: [
                32,
                96,
                109,
                47,
                129,
                113,
                36,
                50,
                221,
                50,
                97,
                195,
                159,
                47,
                214,
                114,
                91,
                170,
                10,
                229,
                48,
                1,
                17,
                195,
                37,
                138,
                215,
                210,
                83,
                6,
                89,
                6,
              ],
              xfr_diff_commitment_high: [
                80,
                96,
                142,
                34,
                38,
                233,
                178,
                134,
                57,
                41,
                98,
                14,
                147,
                119,
                193,
                28,
                137,
                65,
                75,
                201,
                2,
                79,
                133,
                11,
                242,
                71,
                72,
                204,
                245,
                206,
                13,
                23,
              ],
            },
          },
          asset_tracking_proof: {
            asset_type_and_amount_proofs: [],
            inputs_identity_proofs: [[]],
            outputs_identity_proofs: [[]],
          },
        },
        asset_tracing_memos: [[], []],
        owners_memos: [null],
      },
      transfer_type: 'Standard',
    },
    body_signatures: [
      {
        address: {
          key: '9SGftMKATLtb5z-Q7tfG3qnIwR7z7BquLjJcOZHdIE8=',
        },
        signature: 'xFHknbcDo0mXvcxI88bi7KQfpzVqUVMQOeePcevsSPcz4ytWYa12JlaqmiU21xuXgZvNv_bbpa2QGUJUyba_DA==',
      },
    ],
  },
};
