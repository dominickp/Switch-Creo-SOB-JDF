// Is invoked each time a new job arrives in one of the input folders for the flow element.
// The newly arrived job is passed as the second parameter.
function jobArrived( s : Switch, job : Job )
{
	//var filePath = '\\192.168.1.227\Import\test_sob.pdf';
	
	var creoServerIp = s.getPropertyValue( 'CreoServerIp' );
	var localFilePath = s.getPropertyValue( 'LocalFilePath' );
	var quantity = s.getPropertyValue( 'Quantity' );
	var jobName = s.getPropertyValue( 'JobName' );
	var debug = s.getPropertyValue( 'Debug' );
	
	
	var filePath = '\\\\' + creoServerIp + '\\' + localFilePath;
	var logLevel = 2;	
	
	if( debug == 'Yes' ) s.log( logLevel, 'Asset must be accessable here: '+ filePath )
	
	function getJDF( quantity, filePath, jobName )
	{
		jdf = '<?xml version="1.0" encoding="UTF-8"?><JDF Activation="Active" DescriptiveName="Digital Printing example" ID="C20031030J54321" JobPartID="C20031030J54321" Status="Ready" Type="Combined" Types="LayoutPreparation Interpreting Rendering DigitalPrinting" Version="1.2" xmlns="http://www.CIP4.org/JDFSchema_1_1" xmlns:pod-wf="www.pod-wf.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.CIP4.org/JDFSchema_1_1"><ResourceLinkPool><RunListLink CombinedProcessIndex="0 1 2 3" ProcessUsage="Document" Usage="Input" rRef="rl001"><Part RunIndex="0~-1"/></RunListLink><LayoutPreparationParamsLink CombinedProcessIndex="0" Usage="Input" rRef="lpp01"/> ' +
				'<ComponentLink Amount="'+ quantity +'" CombinedProcessIndex="3" Usage="Output" rRef="c0001"/>' +
				'<MediaLink CombinedProcessIndex="0 3" Usage="Input" rRef="m0001"/><DigitalPrintingParamsLink CombinedProcessIndex="3" Usage="Input" rRef="dpp01"/><InterpretingParamsLink CombinedProcessIndex="1" Usage="Input" rRef="ip001"/></ResourceLinkPool><ResourcePool><RunList Class="Parameter" ID="rl001" Pages="" PartIDKeys="Run" Status="Available">' +
				'<LayoutElement><FileSpec MimeType="application/pdf" URL="'+ filePath +'"/></LayoutElement>' +
				'</RunList><Media Class="Consumable" Dimension="792 1224" ID="m0001" Status="Available"/><DigitalPrintingParams Class="Parameter" Collate="SheetSetAndJob" ID="dpp01" PageDelivery="SameOrderFaceDown" Status="Available"><MediaRef rRef="m0001"/></DigitalPrintingParams><LayoutPreparationParams Class="Parameter" ID="lpp01" PartIDKeys="RunIndex" Sides="TwoSidedFlipY" Status="Available"/><InterpretingParams Class="Parameter" ID="ip001" Status="Available"/><Component Class="Quantity" ComponentType="FinalProduct" DescriptiveName="Digital Printing Output" ID="c0001" Status="Available"/></ResourcePool>' +
				'<CustomerInfo CustomerJobName="'+ jobName +'"/>' +
				'<pod-wf:JobTicket DFE_Brand="IC-309m" DFE_Name="192.168.1.227" DFE_Version="1"><pod-wf:JtDataDoc><![CDATA[<?xml version="1.0"?><DATADOC><GROUP NAME="HEADERS"></GROUP><GROUP NAME="BODY"><GROUP NAME="DexExternalParams"><GROUP NAME="DATA" GT=""><GROUP NAME="JOB_DATA" GT=""><PARAM NAME="VirtualPrinter">JTCreator</PARAM><GROUP NAME="JobFlowInfo" GT=""><PARAM NAME="AAFlow" IT="I32">0</PARAM><PARAM NAME="JobFlow">ProcessPrint</PARAM><PARAM NAME="AAExist" IT="BLN">FALSE</PARAM><PARAM NAME="JobDeletionOperationType" IT="I32">1</PARAM><PARAM NAME="FAFExist" IT="BLN">FALSE</PARAM></GROUP><GROUP NAME="JTProperties" GT=""><PARAM NAME="impositionZSorting" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="298">1</PARAM><PARAM NAME="CustomPaperProfile" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="151">0</PARAM><PARAM NAME="PrintNearGrayUsingBlack" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="928">FALSE</PARAM><PARAM NAME="DSF5000Type" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="825">1</PARAM><PARAM NAME="JpegQuality" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="889">75</PARAM><PARAM NAME="SquareFold" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="526">FALSE</PARAM><PARAM NAME="PSOptimization" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="626">FALSE</PARAM><PARAM NAME="ImagePosSide2" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="287">0</PARAM><PARAM NAME="TrimHeadCutPos" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="315">8.000000</PARAM><PARAM NAME="ImagePosSide1" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="286">0</PARAM><PARAM NAME="SILAuto" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="417">2</PARAM><PARAM NAME="IgnoreSpotDict" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="43">FALSE</PARAM><PARAM NAME="CMYKOutputProfile" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="892"></PARAM><PARAM NAME="MatchingSetName" OPER="Header" OPER_INSTANCE="0" PROP_ID="905"></PARAM><PARAM NAME="UserName" OPER="Print" OPER_INSTANCE="0" PROP_ID="1260"></PARAM><PARAM NAME="AVROp" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="221">FALSE</PARAM><PARAM NAME="ManualDuplexSelected" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="792">FALSE</PARAM><PARAM NAME="NearLineProgramId" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="804">1</PARAM><PARAM NAME="SignatureMarksDimensionWidth" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="964">2.000000</PARAM><PARAM NAME="JobNameForDisplay" OPER="Header" OPER_INSTANCE="0" PROP_ID="32">1337 Job Title</PARAM><PARAM NAME="SquareFoldStrength" OPER="Print" OPER_INSTANCE="0" PROP_ID="527">Normal</PARAM><PARAM NAME="PreservePureK_Graphics" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="610">0</PARAM><PARAM NAME="PaperParametersSource" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="1105">1</PARAM><PARAM NAME="EndMarkOffset" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="822">0.000000</PARAM><PARAM NAME="PreservePureK_Text" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="609">0</PARAM><PARAM NAME="CheckSPD_Exceptions" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="514">FALSE</PARAM><PARAM NAME="EndMarkSide" OPER="Print" OPER_INSTANCE="0" PROP_ID="823">Front</PARAM><PARAM NAME="ImpositionMarksColor" OPER="Header" OPER_INSTANCE="0" PROP_ID="930">Black</PARAM><PARAM NAME="CMYKProfileHistory" OPER="Header" OPER_INSTANCE="0" PROP_ID="983"></PARAM><PARAM NAME="Binding" OPER="Print" OPER_INSTANCE="0" PROP_ID="1272">Left</PARAM><PARAM NAME="FinisherProfile" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="301">1</PARAM><PARAM NAME="SignatureMarksMode" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="961">0</PARAM><PARAM NAME="UserPassword" OPER="Print" OPER_INSTANCE="0" PROP_ID="1261"></PARAM><PARAM NAME="SinglePageCover" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="787">FALSE</PARAM><PARAM NAME="SR_NumOfCopiesByImage" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="310">FALSE</PARAM><PARAM NAME="SlitPosition2" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="1269">0.000000</PARAM><PARAM NAME="RGBProfile" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="435">sRGB</PARAM><PARAM NAME="GenerateRegistrationMark" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="802">TRUE</PARAM><PARAM NAME="SlitPosition1" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="1268">0.000000</PARAM><PARAM NAME="AlignmentOffsetBackY" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="956">0.000000</PARAM><PARAM NAME="AlignmentOffsetBackX" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="955">0.000000</PARAM><PARAM NAME="ImpositionStartCreepOut" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="285">0.000000</PARAM><PARAM NAME="PBFinisherTrim" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="306">FALSE</PARAM><PARAM NAME="ImpositionCropMarks" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="279">FALSE</PARAM><PARAM NAME="JobSlugAddedLength" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="945">0</PARAM><PARAM NAME="SignatureMarksNumberOfMarks" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="965">0</PARAM><PARAM NAME="HiFiColors" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="177">6</PARAM><PARAM NAME="FinisherTrim" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="305">1</PARAM><PARAM NAME="TabsKickOutOutputTray" OPER="Header" OPER_INSTANCE="0" PROP_ID="1035">MultiFoldSubTray</PARAM><PARAM NAME="PaperHeight" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="223">297.000000</PARAM><PARAM NAME="ImpositionGutterSizeY" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="958">0.000000</PARAM><PARAM NAME="ImpositionGutterSizeX" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="957">0.000000</PARAM><PARAM NAME="FitToPage" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="238">FALSE</PARAM><PARAM NAME="PrintQualityWRes" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="156">600.000000</PARAM><PARAM NAME="CoverPage" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="227">FALSE</PARAM><PARAM NAME="ImpositionColumns" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="139">2</PARAM><PARAM NAME="KPTSceneBalance" IT="I32" OPER="KPTSTEP" OPER_INSTANCE="0" PROP_ID="801">0</PARAM><PARAM NAME="PreservePureCMY_Text" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="613">0</PARAM><PARAM NAME="SignatureMarksOffsetXorY" OPER="Header" OPER_INSTANCE="0" PROP_ID="968">X</PARAM><PARAM NAME="SampleRange" OPER="Print" OPER_INSTANCE="0" PROP_ID="635">1</PARAM><PARAM NAME="ImpositionTotalCreepIn" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="286">0.000000</PARAM><PARAM NAME="ColorToGray" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="236">FALSE</PARAM><PARAM NAME="PrintingResolutionW" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="1239">1200.000000</PARAM><PARAM NAME="ImpositionMarksVerticalOffset" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="934">2.000000</PARAM><PARAM NAME="TemplateName" OPER="Header" OPER_INSTANCE="0" PROP_ID="255"></PARAM><PARAM NAME="PrintingResolutionH" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="1238">1200.000000</PARAM><PARAM NAME="SectionPassword" OPER="Print" OPER_INSTANCE="0" PROP_ID="1263"></PARAM><PARAM NAME="ImpositionFitToSheet" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="300">TRUE</PARAM><PARAM NAME="CMYKProfile" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="434">GRACoL2006_Coated1v2</PARAM><PARAM NAME="RenderingIntentRGB" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="602">2</PARAM><PARAM NAME="ImpositionNorthSouth" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="159">FALSE</PARAM><PARAM NAME="SpotNamesFromFile" OPER="Header" OPER_INSTANCE="0" PROP_ID="982"></PARAM><PARAM NAME="ImpositionToFold" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="275">FALSE</PARAM><PARAM NAME="PrintRange" OPER="Print" OPER_INSTANCE="0" PROP_ID="226"></PARAM><PARAM NAME="GallopNumPages" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="295">0</PARAM><PARAM NAME="ImpositionBleed" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="276">5.000000</PARAM><PARAM NAME="BarCodePosition" OPER="Print" OPER_INSTANCE="0" PROP_ID="806">TopRight</PARAM><PARAM NAME="Rotate180Condition" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="1103">0</PARAM><PARAM NAME="CoverImpositionOrientation" OPER="Header" OPER_INSTANCE="0" PROP_ID="799">Landscape</PARAM><PARAM NAME="JobSlugScreening" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="1104">FALSE</PARAM><PARAM NAME="PrintGrayUsingBlack" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="927">0</PARAM><PARAM NAME="GrayAsBlack_Graphics" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="630">0</PARAM><PARAM NAME="PBBackDuplex_Mode" OPER="Header" OPER_INSTANCE="0" PROP_ID="1117"></PARAM><PARAM NAME="TotalInkLimitPercentage" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="632">250</PARAM><PARAM NAME="ProtectedTextSize" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="306">0</PARAM><PARAM NAME="KPTJpegDeblocking" IT="BLN" OPER="KPTSTEP" OPER_INSTANCE="0" PROP_ID="805">FALSE</PARAM><PARAM NAME="CoversSpineWidth" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="783">0.000000</PARAM><PARAM NAME="GenerateCornerMark" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="803">TRUE</PARAM><PARAM NAME="JSDateTime" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="614">FALSE</PARAM><PARAM NAME="FullBleed" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="113">FALSE</PARAM><PARAM NAME="CuttingEdge" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="448">TRUE</PARAM><PARAM NAME="SmoothScale" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="206">FALSE</PARAM><PARAM NAME="UpdateHeight" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="1034">FALSE</PARAM><PARAM NAME="CoverSpineBlank" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="785">TRUE</PARAM><PARAM NAME="SignatureMarksSide" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="962">0</PARAM><PARAM NAME="ImpositionTrimHeight" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="273">279.400000</PARAM><PARAM NAME="AMSEFlow" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="648">FALSE</PARAM><PARAM NAME="KPTToneScale" IT="I32" OPER="KPTSTEP" OPER_INSTANCE="0" PROP_ID="803">0</PARAM><PARAM NAME="RenderingIntent_Graphics" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="627">0</PARAM><PARAM NAME="WithinSetNumPages" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="268">1</PARAM><PARAM NAME="JSSheetNumber" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="613">FALSE</PARAM><PARAM NAME="TransparencyQuality" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="814">25</PARAM><PARAM NAME="ImpositionFoldMarks" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="280">FALSE</PARAM><PARAM NAME="TabsInBank" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="1001">5</PARAM><PARAM NAME="IsOffice" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="106">FALSE</PARAM><PARAM NAME="UpdateWidth" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="1106">FALSE</PARAM><PARAM NAME="All" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="216">1</PARAM><PARAM NAME="ColorSetName" OPER="Header" OPER_INSTANCE="0" PROP_ID="660">DefaultSet</PARAM><PARAM NAME="JobSlugColorServerDescr" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="941">FALSE</PARAM><PARAM NAME="DivideToBookletsNum" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="126">0</PARAM><PARAM NAME="FinisherOffset" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="520">0</PARAM><PARAM NAME="CoverImageShiftY" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="900">0.000000</PARAM><PARAM NAME="CoverImageShiftX" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="899">0.000000</PARAM><PARAM NAME="JobSlugCalibDate" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="944">FALSE</PARAM><PARAM NAME="FaceUp" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="219">FALSE</PARAM><PARAM NAME="SignatureMarksPositionY" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="967">0.000000</PARAM><PARAM NAME="SignatureMarksPositionX" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="966">0.000000</PARAM><PARAM NAME="OutlineEnh" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="622">FALSE</PARAM><PARAM NAME="RenderingIntentRGB_Text" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="617">0</PARAM><PARAM NAME="PreservePureCMY_Graphics" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="614">0</PARAM><PARAM NAME="TrimCutToSizeWidth" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="313">0.000000</PARAM><PARAM NAME="SectionName" OPER="Print" OPER_INSTANCE="0" PROP_ID="1262"></PARAM><PARAM NAME="CoverPageSameAsJob" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="234">TRUE</PARAM><PARAM NAME="SIL" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="401">FALSE</PARAM><PARAM NAME="ResubmitAfterDelete" IT="I32" OPER="JobDeletion" OPER_INSTANCE="0" PROP_ID="205">0</PARAM><PARAM NAME="FinisherMarkSide" OPER="Print" OPER_INSTANCE="0" PROP_ID="817">Front</PARAM><PARAM NAME="ImagePosSameSides" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="292">FALSE</PARAM><PARAM NAME="InkSavingGCR" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="242">3</PARAM><PARAM NAME="OverrideRGBCSA" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="511">TRUE</PARAM><PARAM NAME="ImpositionCropMarksBothSize" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="269">FALSE</PARAM><PARAM NAME="IPDSUseBlackPrint" IT="BLN" OPER="UltraParams" OPER_INSTANCE="0" PROP_ID="662">FALSE</PARAM><PARAM NAME="TrimCutToSizeHeigth" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="314">0.000000</PARAM><PARAM NAME="GrayAsBlack_Image" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="631">0</PARAM><PARAM NAME="GenStaplePosition" OPER="Print" OPER_INSTANCE="0" PROP_ID="626">Staple_Saddle_0_2</PARAM><PARAM NAME="PaperWidth" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="224">210.000000</PARAM><PARAM NAME="ImageShiftY2" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="291">0.000000</PARAM><PARAM NAME="ImageShiftY1" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="289">0.000000</PARAM><PARAM NAME="ImpositionSpineTrimSize" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="282">0.000000</PARAM><PARAM NAME="Account" OPER="Header" OPER_INSTANCE="0" PROP_ID="301">1337 Account</PARAM><PARAM NAME="DeletePrintedJobType" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="936">0</PARAM><PARAM NAME="AlignmentSameOnBothSides" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="952">FALSE</PARAM><PARAM NAME="OriginalOrientation" OPER="Header" OPER_INSTANCE="0" PROP_ID="216">Portrait</PARAM><PARAM NAME="ImpositionTrimWidth" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="274">215.900000</PARAM><PARAM NAME="AlignmentOffsetFrontY" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="954">0.000000</PARAM><PARAM NAME="AlignmentOffsetFrontX" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="953">0.000000</PARAM><PARAM NAME="CollationHS" OPER="Print" OPER_INSTANCE="0" PROP_ID="218">JobCollated</PARAM><PARAM NAME="ImpositionSheetLeadingEdge" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="524">2</PARAM><PARAM NAME="ScreeningAngle" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="1221">0.000000</PARAM><PARAM NAME="ImageEdgeEnhancment" OPER="Print" OPER_INSTANCE="0" PROP_ID="1100">Off</PARAM><PARAM NAME="TrimTailCutPos" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="316">6.000000</PARAM><PARAM NAME="Slit" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="1251">0</PARAM><PARAM NAME="PreservePureK_Image" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="611">0</PARAM><PARAM NAME="TrimCutToSize" OPER="Print" OPER_INSTANCE="0" PROP_ID="312"></PARAM><PARAM NAME="ImageShiftX2" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="290">0.000000</PARAM><PARAM NAME="SupportGraySpotColors" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="471">FALSE</PARAM><PARAM NAME="ImageShiftX1" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="288">0.000000</PARAM><PARAM NAME="ImpositionMarksHorizontalOffset" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="935">2.000000</PARAM><PARAM NAME="PDFOptimization" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="148">FALSE</PARAM><PARAM NAME="JobComments" OPER="Header" OPER_INSTANCE="0" PROP_ID="200">1337 Job Comments</PARAM><PARAM NAME="ImpositionOrientation" OPER="Header" OPER_INSTANCE="0" PROP_ID="266"></PARAM><PARAM NAME="BlackPointCompensation" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="1066">FALSE</PARAM><PARAM NAME="ImpositionSheetHeight" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="278">0.000000</PARAM><PARAM NAME="SetOffset" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="265">0</PARAM><PARAM NAME="Contrast" OPER="Print" OPER_INSTANCE="0" PROP_ID="244">PB_ContrastNormal</PARAM><PARAM NAME="EndMarkWidth" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="824">2.000000</PARAM><PARAM NAME="JobSlugColorProfiles" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="943">FALSE</PARAM><PARAM NAME="SupportRGBSpotColors" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="406">FALSE</PARAM><PARAM NAME="ImpositionScale" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="144">1.000000</PARAM><PARAM NAME="ImpositionNestedSaddleSheets" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="932">1</PARAM><PARAM NAME="ImpositionMethod" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="270">1</PARAM><PARAM NAME="Staple" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="521">0</PARAM><PARAM NAME="OutputFiles" IT="BLN" OPER="JobDeletion" OPER_INSTANCE="0" PROP_ID="201">TRUE</PARAM><PARAM NAME="Paper_Size" OPER="Header" OPER_INSTANCE="0" PROP_ID="214">PB_A4_P</PARAM><PARAM NAME="FinisherTray" OPER="Print" OPER_INSTANCE="0" PROP_ID="294">SaddleStitchMainTraySD506</PARAM><PARAM NAME="EndMarkPosition" OPER="Print" OPER_INSTANCE="0" PROP_ID="821">LeftCenter</PARAM><PARAM NAME="PBFrontDuplex_Mode" OPER="Header" OPER_INSTANCE="0" PROP_ID="1116"></PARAM><PARAM NAME="BarCodeSide" OPER="Print" OPER_INSTANCE="0" PROP_ID="805">Front</PARAM><PARAM NAME="ImpositionAutoCreep" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="532">FALSE</PARAM><PARAM NAME="GenerateBarCode" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="801">TRUE</PARAM><PARAM NAME="PaperSetName" OPER="Header" OPER_INSTANCE="0" PROP_ID="466"></PARAM><PARAM NAME="ImpositionMarginSize" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="284">0.000000</PARAM><PARAM NAME="RenderingIntentRGB_Image" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="619">0</PARAM><PARAM NAME="BlackOverPrint" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="200">TRUE</PARAM><PARAM NAME="CheckFonts" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="510">FALSE</PARAM><PARAM NAME="UseCMYKDevicelink" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="481">FALSE</PARAM><PARAM NAME="GlossMarkEnable" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="729">FALSE</PARAM><PARAM NAME="JSComment" OPER="Print" OPER_INSTANCE="0" PROP_ID="615"></PARAM><PARAM NAME="PreservePureCMY_Image" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="615">0</PARAM><PARAM NAME="PrintMode" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="540">0</PARAM><PARAM NAME="GrayAsBlack_Text" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="629">0</PARAM><PARAM NAME="SlitOffset" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="1270">0.000000</PARAM><PARAM NAME="FullyRipped" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="124">0</PARAM><PARAM NAME="TabFlow" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="649">FALSE</PARAM><PARAM NAME="SharpenEdges" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="534">FALSE</PARAM><PARAM NAME="ImpositionGutterSize" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="283">0.000000</PARAM><PARAM NAME="ImageScale" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="145">100.000000</PARAM><PARAM NAME="FontSubstitute" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="309">FALSE</PARAM><PARAM NAME="JobSlug" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="610">FALSE</PARAM><PARAM NAME="JSColorBar" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="611">FALSE</PARAM><PARAM NAME="KPTPhotoEnhancement" IT="BLN" OPER="KPTSTEP" OPER_INSTANCE="0" PROP_ID="800">FALSE</PARAM><PARAM NAME="Color_Type_Name" OPER="Header" OPER_INSTANCE="0" PROP_ID="403">White</PARAM><PARAM NAME="FinisherMarkCrossTrackOffset" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="816">0.000000</PARAM><PARAM NAME="Coating" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="283">FALSE</PARAM><PARAM NAME="DisplayLowRes" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="203">0</PARAM><PARAM NAME="ImpositionTrimSize" OPER="Header" OPER_INSTANCE="0" PROP_ID="272">PB_11_P</PARAM><PARAM NAME="DotShape" OPER="Header" OPER_INSTANCE="0" PROP_ID="1222">SimpleDot</PARAM><PARAM NAME="DefaultRGBCSA" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="245">sRGB.csa</PARAM><PARAM NAME="Mirror" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="659">FALSE</PARAM><PARAM NAME="DeletePolicy" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="31">0</PARAM><PARAM NAME="EndMarkInUse" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="820">FALSE</PARAM><PARAM NAME="ScreeningMethod" OPER="Header" OPER_INSTANCE="0" PROP_ID="251">Photo</PARAM><PARAM NAME="SourcePaperTint" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="128">FALSE</PARAM><PARAM NAME="Brightness" OPER="Print" OPER_INSTANCE="0" PROP_ID="243">PB_BrightNormal</PARAM><PARAM NAME="RenderingIntentRGB_Graphics" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="618">0</PARAM><PARAM NAME="EnlargeW" IT="FLT" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="217">1.000000</PARAM><PARAM NAME="APPEFlowMode" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="1050">0</PARAM><PARAM NAME="SampleNumCopy" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="632">50</PARAM><PARAM NAME="DefaultCMYKCSA" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="244">GRACoL2006_Coated1v2.csa</PARAM><PARAM NAME="PrintQualityHRes" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="155">600.000000</PARAM><PARAM NAME="EnlargeH" IT="FLT" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="216">1.000000</PARAM><PARAM NAME="Weight" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="282">1</PARAM><PARAM NAME="Tray" OPER="Print" OPER_INSTANCE="0" PROP_ID="284">Auto</PARAM><PARAM NAME="AddNoiseToCT" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="889">6</PARAM><PARAM NAME="ImpositionSetsStuck" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="1053">FALSE</PARAM><PARAM NAME="AutoTrapping" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="1101">FALSE</PARAM><PARAM NAME="GrayBalanceLut" OPER="Print" OPER_INSTANCE="0" PROP_ID="247">Normal</PARAM><PARAM NAME="GenPunchPosition" OPER="Print" OPER_INSTANCE="0" PROP_ID="627">None</PARAM><PARAM NAME="UseLegacyPantoneLibrary" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="1072">FALSE</PARAM><PARAM NAME="ImpositionBinding" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="162">1</PARAM><PARAM NAME="ImpositionMarksFoldHairLine" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="971">FALSE</PARAM><PARAM NAME="KPTNoiseReduction" IT="I32" OPER="KPTSTEP" OPER_INSTANCE="0" PROP_ID="802">0</PARAM><PARAM NAME="ImpositionPrintMethod" OPER="Header" OPER_INSTANCE="0" PROP_ID="136">PB_Duplex_None</PARAM><PARAM NAME="ImpositionStacks" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="1064">FALSE</PARAM><PARAM NAME="SupportCMYKSpotColors" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="470">FALSE</PARAM><PARAM NAME="ImpositionSetGutterSize" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="789">10.000000</PARAM><PARAM NAME="ImpositionRotate" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="137">1</PARAM><PARAM NAME="ImpositionMode" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="135">0</PARAM><PARAM NAME="BookletRange" OPER="Print" OPER_INSTANCE="0" PROP_ID="531"></PARAM><PARAM NAME="Rotate180" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="104">TRUE</PARAM><PARAM NAME="TrimShiftY" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="886">0.000000</PARAM><PARAM NAME="TrimShiftX" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="885">0.000000</PARAM><PARAM NAME="PreflightCheck" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="509">FALSE</PARAM><PARAM NAME="TrimForeCutPos" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="317">6.000000</PARAM><PARAM NAME="ScreeningFrequency" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="1220">40</PARAM><PARAM NAME="PriorityPass" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="1112">FALSE</PARAM><PARAM NAME="DeleteFailedJobType" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="937">0</PARAM><PARAM NAME="Crease" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="1250">0</PARAM><PARAM NAME="ImpositionSheetSize" OPER="Header" OPER_INSTANCE="0" PROP_ID="265"></PARAM><PARAM NAME="TrimCutEdgeMode" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="311">6</PARAM><PARAM NAME="KTPRedEyeRemoval" IT="BLN" OPER="KPTSTEP" OPER_INSTANCE="0" PROP_ID="804">FALSE</PARAM><PARAM NAME="EdgeSharpening" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="1253">FALSE</PARAM><PARAM NAME="Finisher" OPER="Print" OPER_INSTANCE="0" PROP_ID="293">OCT</PARAM><PARAM NAME="DefaultCMYKCSAHistory" OPER="Header" OPER_INSTANCE="0" PROP_ID="984"></PARAM><PARAM NAME="CopiesNumber" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="237">1337</PARAM><PARAM NAME="StapleOption" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="523">0</PARAM><PARAM NAME="CheckHi_Res" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="512">FALSE</PARAM><PARAM NAME="Custom1DLut" OPER="Header" OPER_INSTANCE="0" PROP_ID="260">PB_None</PARAM><PARAM NAME="Media_Type" OPER="Print" OPER_INSTANCE="0" PROP_ID="213">Normal</PARAM><PARAM NAME="IsPrintSample" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="631">FALSE</PARAM><PARAM NAME="RenderingIntent" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="243">3</PARAM><PARAM NAME="UseRGBDevicelink" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="483">FALSE</PARAM><PARAM NAME="FailJobIfSpotNotInFile" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="700">FALSE</PARAM><PARAM NAME="GlossyFinishing" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="233">FALSE</PARAM><PARAM NAME="SampleSetFinisherTray" OPER="Print" OPER_INSTANCE="0" PROP_ID="636">StackerSubTray</PARAM><PARAM NAME="FinisherMarkInTrackOffset" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="815">0.000000</PARAM><PARAM NAME="FinisherDFAFunc2" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="303">FALSE</PARAM><PARAM NAME="FinisherDFAFunc1" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="302">FALSE</PARAM><PARAM NAME="SignatureMarksOffsetXorYValue" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="969">0.000000</PARAM><PARAM NAME="WithinSetOffset" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="267">0</PARAM><PARAM NAME="StaplePosition" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="522">0</PARAM><PARAM NAME="ManualDuplex" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="307">0</PARAM><PARAM NAME="RenderingIntent_Text" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="620">0</PARAM><PARAM NAME="SmootText" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="623">FALSE</PARAM><PARAM NAME="PrintOrderNormal" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="250">TRUE</PARAM><PARAM NAME="PipeLineMode" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="894">1</PARAM><PARAM NAME="SampleSheetRange" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="633">1</PARAM><PARAM NAME="FinisherMarkPosition" OPER="Print" OPER_INSTANCE="0" PROP_ID="818">TopLeft</PARAM><PARAM NAME="EdgeEnhancmentTo" OPER="Print" OPER_INSTANCE="0" PROP_ID="1102">TGI</PARAM><PARAM NAME="TabKickOut" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="1000">FALSE</PARAM><PARAM NAME="OverrideCMYKCSA" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="510">TRUE</PARAM><PARAM NAME="JobSlugIsoLevel" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="939">FALSE</PARAM><PARAM NAME="CMYKOutputProfile_BackSide" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="638"></PARAM><PARAM NAME="RenderingIntent_Image" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="628">0</PARAM><PARAM NAME="JobSlugPrintDescr" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="940">FALSE</PARAM><PARAM NAME="ImpNumRepeatSets" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="180">1</PARAM><PARAM NAME="PagesPerDividedBooklet" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="1212">0</PARAM><PARAM NAME="Inverter" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="807">FALSE</PARAM><PARAM NAME="SampleNumSheets" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="634">1</PARAM><PARAM NAME="ImpositionRows" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="138">1</PARAM><PARAM NAME="JobSlugColorMedia" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="942">FALSE</PARAM><PARAM NAME="EmulateRGBElements" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="41">FALSE</PARAM><PARAM NAME="ImageScaleOriginal" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="931">1.000000</PARAM><PARAM NAME="GuiRevertPrintOrder" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="280">FALSE</PARAM><PARAM NAME="NearLineFinisher" OPER="Print" OPER_INSTANCE="0" PROP_ID="800">None</PARAM><PARAM NAME="GenPunchRingBind" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="642">0</PARAM><PARAM NAME="Duplex_Mode" OPER="Header" OPER_INSTANCE="0" PROP_ID="236">PB_DupHeadToHead</PARAM><PARAM NAME="ImageScaleByPage" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="929">FALSE</PARAM><PARAM NAME="SlimText" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="620">FALSE</PARAM><PARAM NAME="CreasePosition4" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="1267">0.000000</PARAM><PARAM NAME="CreasePosition3" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="1266">0.000000</PARAM><PARAM NAME="Color_Mode" OPER="Print" OPER_INSTANCE="0" PROP_ID="210">PB_CMYK</PARAM><PARAM NAME="GenMultiHolePunch" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="641">0</PARAM><PARAM NAME="CreasePosition2" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="1265">0.000000</PARAM><PARAM NAME="OverPrint" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="205">TRUE</PARAM><PARAM NAME="CreasePosition1" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="1264">0.000000</PARAM><PARAM NAME="BarCodeInTrackOffset" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="808">10.000000</PARAM><PARAM NAME="ImpositionMedia_Name" OPER="Header" OPER_INSTANCE="0" PROP_ID="430"></PARAM><PARAM NAME="GenFoldType" OPER="Print" OPER_INSTANCE="0" PROP_ID="628">Multi_Fold_F4-1</PARAM><PARAM NAME="StaplePitch2Points" OPER="Print" OPER_INSTANCE="0" PROP_ID="1252">Narrow</PARAM><PARAM NAME="SignatureMarksBlackColor" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="970">100</PARAM><PARAM NAME="InsidePrinting" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="625">FALSE</PARAM><PARAM NAME="SetOffsetNumSets" IT="I32" OPER="Print" OPER_INSTANCE="0" PROP_ID="266">1</PARAM><PARAM NAME="JSJobName" IT="BLN" OPER="Print" OPER_INSTANCE="0" PROP_ID="612">FALSE</PARAM><PARAM NAME="VariableBookletLength" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="179">FALSE</PARAM><PARAM NAME="BarCodeCrossTrackOffset" IT="FLT" OPER="Print" OPER_INSTANCE="0" PROP_ID="809">10.000000</PARAM><PARAM NAME="CheckColor" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="511">FALSE</PARAM><PARAM NAME="PreflightCheckMode" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="1217">1</PARAM><PARAM NAME="PreservePureBlack" IT="BLN" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="40">TRUE</PARAM><PARAM NAME="ImpositionSheetWidth" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="277">0.000000</PARAM><PARAM NAME="SignatureMarksDimensionHeight" IT="FLT" OPER="Header" OPER_INSTANCE="0" PROP_ID="963">10.000000</PARAM><PARAM NAME="PageExceptionsThroughSPD" IT="BLN" OPER="Header" OPER_INSTANCE="0" PROP_ID="110">FALSE</PARAM><PARAM NAME="FontPolicyAPPE" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="308">2</PARAM><PARAM NAME="ImpositionStacksSize" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="1065">1000</PARAM><PARAM NAME="HiFiColorsBack" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="811">6</PARAM><PARAM NAME="Alignment" IT="I32" OPER="Header" OPER_INSTANCE="0" PROP_ID="951">0</PARAM><PARAM NAME="MapSpotColorsUsing" IT="I32" OPER="RipNT" OPER_INSTANCE="0" PROP_ID="287">0</PARAM><GROUP NAME="LAYER_PAGE_RANGE" APP_KEY="LAYER_PAGE_RANGE" GT="RuleLayer"></GROUP><GROUP NAME="DivideToBookletsTable" APP_KEY="DivideToBookletsTable" GT="JT_OBJECT_ARRAY" OPER="Header" OPER_INSTANCE="0" PROP_ID="1211"></GROUP><GROUP NAME="LAYER_SLIP_SHEETS" APP_KEY="LAYER_SLIP_SHEETS" GT="RuleLayer"></GROUP><GROUP NAME="LAYER_INSERTS" APP_KEY="LAYER_INSERTS" GT="RuleLayer"></GROUP><GROUP NAME="PaperSetAray" APP_KEY="PaperSetAray" GT="JT_OBJECT_ARRAY" OPER="Header" OPER_INSTANCE="0" PROP_ID="201"></GROUP><GROUP NAME="LAYER_BANNER_PAGE" APP_KEY="LAYER_BANNER_PAGE" GT="RuleLayer"></GROUP><GROUP NAME="LAYER_INTERLEAF" APP_KEY="LAYER_INTERLEAF" GT="RuleLayer"></GROUP><GROUP NAME="MarkSetTable" APP_KEY="MarkSetTable" GT="JT_OBJECT_ARRAY" OPER="Header" OPER_INSTANCE="0" PROP_ID="973"></GROUP><GROUP NAME="ProgressivePrinting" APP_KEY="ProgressivePrinting" GT="ProgressivePrinting" OPER="Print" OPER_INSTANCE="0" PROP_ID="541"></GROUP><GROUP NAME="MainStock" APP_KEY="MainStock" GT="StockProperties"><GROUP NAME="PaperStockObj" GT="UPS"><PARAM NAME="Loaded" IT="I32">1</PARAM><PARAM NAME="Drilled" IT="I32">0</PARAM><PARAM NAME="LeadingEdgeLef" IT="BLN">FALSE</PARAM><PARAM NAME="BackSideCoating" IT="I32">0</PARAM><PARAM NAME="PaperStockReference" IT="I32">0</PARAM><PARAM NAME="LeadingEdge" IT="I32">3</PARAM><PARAM NAME="PaperSetId" IT="I32">3</PARAM><PARAM NAME="Color">White</PARAM><PARAM NAME="Tray">Tray1</PARAM><PARAM NAME="IsColored" IT="BLN">FALSE</PARAM><PARAM NAME="MediaType">Plain</PARAM><PARAM NAME="FrontSideCoating" IT="I32">0</PARAM><PARAM NAME="Height" IT="FLT">431.800000</PARAM><PARAM NAME="WeightFrom" IT="FLT">92.000000</PARAM><PARAM NAME="WeightTo" IT="FLT">135.000000</PARAM><PARAM NAME="MediaName">80#_11x17</PARAM><PARAM NAME="PaperProfileID" IT="I32">3</PARAM><PARAM NAME="Width" IT="FLT">279.400000</PARAM><PARAM NAME="PaperSize">PB_17_P</PARAM><PARAM NAME="MediaId" IT="I32">3</PARAM></GROUP></GROUP><GROUP NAME="SpotInksObject" APP_KEY="SpotInksObject" GT="SpotInksObject" OPER="Header" OPER_INSTANCE="0" PROP_ID="173"></GROUP><GROUP NAME="LAYER_FRONT_COVER" APP_KEY="LAYER_FRONT_COVER" GT="RuleLayer"></GROUP><GROUP NAME="LAYER_SETS_RANGE" APP_KEY="LAYER_SETS_RANGE" GT="RuleLayer"></GROUP><GROUP NAME="LAYER_BACK_COVER" APP_KEY="LAYER_BACK_COVER" GT="RuleLayer"></GROUP></GROUP></GROUP></GROUP></GROUP></GROUP><GROUP NAME="ATTACHMENTS"></GROUP></DATADOC>]]></pod-wf:JtDataDoc></pod-wf:JobTicket></JDF>';
	
		return jdf;	
	}
	
	// Get JDF
	var jdf = getJDF( quantity, filePath, jobName );	
	
	// Write the JDF to a file
	var jdf_file = job.createPathWithName( job.getNameProper() + '_ticket.jdf' );
	File.write( jdf_file, jdf );
	
	// End
	job.sendToSingle( jdf_file );
	
}
