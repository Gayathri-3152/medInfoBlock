const { use, should, assert } = require('chai')
const { contracts_build_directory } = require('../truffle-config')


const medInfo = artifacts.require('./MedInfo.sol')

require('chai')
   use(require('chai-as-promised'))
   should()

   contract('MedInfo',(accounts) => {
    let MedInfo 
    
    before(async () =>{
        MedInfo = await medInfo.deployed()
    })
    describe('deployment',async () =>{
        it('deploys successfully', async () =>{
            
            const address = MedInfo.address
            console.log(address)
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)

        });
        it('has a name', async () =>{
            const name = await MedInfo.name()
            assert.equal(name,'MedInfoBlock')
        });
        it('has a symbol', async () =>{
            const symbol = await MedInfo.symbol()
            assert.equal(symbol,'medinfo')
        });
       
    });

    describe("application features", async () => {
        it("default permission status false", async () => {
          const MedInfoCount = await MedInfo.InfoCounter()
          assert.equal(MedInfoCount.toNumber(), 0)
          
          let editPermission
          editPermission = await MedInfo.getEditPermissionStatus(accounts[1],{from : accounts[0]})
          assert.equal(editPermission,false)
          let viewPermission
          viewPermission = await MedInfo.getViewPermissionStatus(accounts[1],{from : accounts[0]})
          assert.equal(viewPermission,false)

          let editPermission1
          editPermission1 = await MedInfo.getEditPermissionStatus(accounts[0],{from : accounts[0]})
          assert.equal(editPermission1,false)
          let viewPermission1
          viewPermission1 = await MedInfo.getViewPermissionStatus(accounts[0],{from : accounts[0]})
          assert.equal(viewPermission1,false)
          

        });

        it("User provide permission to edit and view", async () => {
           
            await MedInfo.giveEditPermission(accounts[1],accounts[0],{from : accounts[0]})
            let editPermission
            editPermission = await MedInfo.getEditPermissionStatus(accounts[1],{from : accounts[0]})
            assert.equal(editPermission,true)

            
            await MedInfo.giveViewPermission(accounts[1],accounts[0],{from : accounts[0]})
            let viewPermission
            viewPermission = await MedInfo.getViewPermissionStatus(accounts[1],{from : accounts[0]})
            assert.equal(viewPermission,true)
  
            await MedInfo.giveEditPermission(accounts[1],accounts[0],{from: 0x0000000000000000000000000000000000000000,
            }).should.be.rejected;
            await MedInfo.giveViewPermission(accounts[1],accounts[0],{from: 0x0000000000000000000000000000000000000000,
            }).should.be.rejected;
            
            await MedInfo.giveEditPermission(accounts[1],accounts[0],{from: accounts[6],
            }).should.be.rejected;
            await MedInfo.giveViewPermission(accounts[1],accounts[0],{from: accounts[6],
            }).should.be.rejected;
            
            
  
          });
          it("User can have one emergency user", async () => {

            await MedInfo.setEmergencyUser(accounts[2],{from : accounts[0]})
            let emergencyUser
            emergencyUser = await MedInfo.getEmergencyUser({from : accounts[0]})            
            assert.equal(emergencyUser,accounts[2])

            await MedInfo.setEmergencyUser(accounts[3],{from : accounts[0]})
            emergencyUser = await MedInfo.getEmergencyUser({from : accounts[0]})            
            assert.equal(emergencyUser,accounts[3])

          });

          it("Emergency user can provide edit and view permission", async () => {
           
            await MedInfo.giveEditPermission(accounts[6],accounts[0],{from : accounts[3]})
            let editPermission
            editPermission = await MedInfo.getEditPermissionStatus(accounts[6],{from : accounts[0]})
            assert.equal(editPermission,true)

            
            await MedInfo.giveViewPermission(accounts[6],accounts[0],{from : accounts[3]})
            let viewPermission
            viewPermission = await MedInfo.getViewPermissionStatus(accounts[6],{from : accounts[0]})
            assert.equal(viewPermission,true)
          });
          it("Only permitted user can create record", async () => {
           
            let MedInfoCount 
            await MedInfo.mint(
                "title 1",
                "record 1",
                accounts[0],
                {from : accounts[6]}
                )
                MedInfoCount = await MedInfo.InfoCounter()
                
                let record;
                record = await MedInfo.allRecords(MedInfoCount, {
                  from: accounts[0],
                });
             
                assert.equal(record.ownedBy,accounts[0]);
                assert.equal(record.createdBy,accounts[6]);
                assert.equal(record.title,"title 1");
                assert.equal(record.description,"record 1");
            let viewPermission
            viewPermission = await MedInfo.getViewPermissionStatus(accounts[0],{from : accounts[0]})
            assert.equal(viewPermission,true)


                await MedInfo.mint(
                    "title 1",
                    "record 1",
                    accounts[0],
                    {from : 0x0000000000000000000000000000000000000000, }
                    ).should.be.rejected;
           
                await MedInfo.mint(
                    "title 1",
                    "record 1",
                    accounts[0],
                    {from : accounts[3]}
                    ).should.be.rejected;
                
                    await MedInfo.mint(
                        "title 1",
                        "record 1",
                        accounts[0],
                        {from : accounts[0]}
                        ).should.be.rejected;
            
          });
        it("only user can revoke edit and view permission", async () => {
           
            await MedInfo.revokeEditPermission(accounts[1],{from : accounts[0]})
            let editPermission
            editPermission = await MedInfo.getEditPermissionStatus(accounts[1],{from : accounts[0]})
            assert.equal(editPermission,false)

            
            await MedInfo.revokeViewPermission(accounts[1],{from : accounts[0]})
            let viewPermission
            viewPermission = await MedInfo.getViewPermissionStatus(accounts[1],{from : accounts[0]})
            assert.equal(viewPermission,false)
          });
    });   
});

