pb:
	protoc \
			--plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" \
			--ts_out=./src/protos/ \
			--proto_path ../protos/ \
			../protos/game.proto
run: pb
	npm run dev -- --open
