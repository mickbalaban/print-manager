var should = require('should'),
    fs = require('fs'),
    os = require('os'),
    path = require('path'),
    checksum = require('checksum'),

    TestHelper = require('../../helpers/TestHelper'),
    TypeATranslator = require('../../../printableTranslation/translators/TypeA'),

    printerType = {id :"F2F4B9B6-1D54-4A16-883E-B0385F27380C"},

    inputTerseFile = path.join(__dirname, '../../data/printables/FDMPrintableTypeA.mic'),
    comparableTerseFile = path.join(__dirname, '../../data/comparables/FDMComparableTypeA.gcode'),
    comparableTerseNoCR = path.join(os.tmpdir(), 'FDMComparableTypeA.gcode'),
    outputTerseFile = path.join(os.tmpdir(), 'FDMPrintableTypeA.gcode'),

    inputVerboseFile = path.join(__dirname, '../../data/printables/FDMPrintableTypeAVerbose.mic'),
    comparableVerboseFile = path.join(__dirname, '../../data/comparables/FDMComparableTypeAVerbose.gcode'),
    comparableVerboseNoCR = path.join(os.tmpdir(), 'FDMComparableTypeAVerbose.gcode'),
    outputVerboseFile = path.join(os.tmpdir(), 'FDMPrintableTypeAVerbose.gcode'),

    inputVerboseRaftFile = path.join(__dirname, '../../data/printables/FDMPrintableTypeAVerboseRaft.mic'),
    comparableVerboseRaftFile = path.join(__dirname, '../../data/comparables/FDMComparableTypeAVerboseRaft.gcode'),
    comparableVerboseRaftNoCR = path.join(os.tmpdir(), 'FDMComparableTypeAVerboseRaft.gcode'),
    outputVerboseRaftFile = path.join(os.tmpdir(), 'FDMPrintableTypeAVerboseRaft.gcode'),

    inputVerboseSupportsFile = path.join(__dirname, '../../data/printables/FDMPrintableTypeAVerboseSupports.mic'),
    comparableVerboseSupportsFile = path.join(__dirname, '../../data/comparables/FDMComparableTypeAVerboseSupports.gcode'),
    comparableVerboseSupportsNoCR = path.join(os.tmpdir(), 'FDMComparableTypeAVerboseSupports.gcode'),
    outputVerboseSupportsFile = path.join(os.tmpdir(), 'FDMPrintableTypeAVerboseSupports.gcode');

function removeCarriage(inputFile, outputFile) {
    var data = fs.readFileSync(inputFile, 'utf8');
    var result = data.replace(/[\r]/g, '');
    fs.writeFileSync(path.join(outputFile), result, 'utf8');
}

describe('Type A Translator', function () {

    it('should verify that it has the proper printerType ID', function (done) {
        TypeATranslator.canTranslate(printerType).should.equal(true);
        done();
    });

    it('should translate a valid terse FDM file', function (done) {

        var config = {
            verbose : undefined,
            precision : undefined
        };
        config.verbose = false;
        config.precision = {
            x: 3,
            y: 3,
            z: 3,
            e: 5,
            f: 0,
            p: 0,
            s: 0
        };

        var translator = new TypeATranslator(printerType, undefined, undefined, config);

        var jobName = "Spark";
        translator.getJobName().should.eql(jobName);

        translator.translate(inputTerseFile, outputTerseFile)
        .then(function () {
            removeCarriage(comparableTerseFile, comparableTerseNoCR);
        })
        .then(function () {
            checksum.file(outputTerseFile, function (err, sum) {
                checksum.file(comparableTerseNoCR, function (err2, sum2) {
                    sum.should.equal(sum2);
                    done();
                });
            });
        })
        .catch(function (err) {
            done(err);
        });
    });

    it('should translate a valid verbose FDM file', function (done) {

        var config = {
            verbose : undefined,
            precision : undefined
        };
        config.verbose = true;
        config.precision = {
            x: 3,
            y: 3,
            z: 3,
            e: 5,
            f: 0,
            p: 0,
            s: 0
        };

        var translator = new TypeATranslator(printerType, undefined, undefined, config);

        //Faking a timestamp to match the gospel mic file
        translator.theFile = "; Generated by Spark Print Studio Date: 2015 09 09 Time: 09 52\n";

        translator.translate(inputVerboseFile, outputVerboseFile)
        .then(function () {
            removeCarriage(comparableVerboseFile, comparableVerboseNoCR);
        })
        .then(function () {
            checksum.file(outputVerboseFile, function (err, sum) {
                checksum.file(comparableVerboseNoCR, function (err2, sum2) {
                    sum.should.equal(sum2);
                    done();
                });
            });
        })
        .catch(function (err) {
            done(err);
        });
    });

    it('should translate a valid verbose FDM file with a raft', function (done) {

        var config = {
            verbose : undefined,
            precision : undefined
        };
        config.verbose = true;
        config.precision = {
            x: 3,
            y: 3,
            z: 3,
            e: 5,
            f: 0,
            p: 0,
            s: 0
        };

        var translator = new TypeATranslator(printerType, undefined, undefined, config);

        //Faking a timestamp to match the gospel mic file
        translator.theFile = "; Generated by Spark Print Studio Date: 2015 09 09 Time: 09 52\n";

        translator.translate(inputVerboseRaftFile, outputVerboseRaftFile)
        .then(function () {
            removeCarriage(comparableVerboseRaftFile, comparableVerboseRaftNoCR);
        })
        .then(function () {
            checksum.file(outputVerboseRaftFile, function (err, sum) {
                checksum.file(comparableVerboseRaftNoCR, function (err2, sum2) {
                    sum.should.equal(sum2);
                    done();
                });
            });
        })
        .catch(function (err) {
            done(err);
        });
    });

    it('should translate a valid verbose FDM file with supports', function (done) {

        var config = {
            verbose : undefined,
            precision : undefined
        };
        config.verbose = true;
        config.precision = {
            x: 3,
            y: 3,
            z: 3,
            e: 5,
            f: 0,
            p: 0,
            s: 0
        };

        var translator = new TypeATranslator(printerType, undefined, undefined, config);

        //Faking a timestamp to match the gospel mic file
        translator.theFile = "; Generated by Spark Print Studio Date: 2015 09 09 Time: 09 52\n";

        translator.translate(inputVerboseSupportsFile, outputVerboseSupportsFile)
        .then(function () {
            removeCarriage(comparableVerboseSupportsFile, comparableVerboseSupportsNoCR);
        })
        .then(function () {
            checksum.file(outputVerboseSupportsFile, function (err, sum) {
                checksum.file(comparableVerboseSupportsNoCR, function (err2, sum2) {
                    sum.should.equal(sum2);
                    done();
                });
            });
        })
        .catch(function (err) {
            done(err);
        });
    });

});
