# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import loss_pb2 as loss__pb2


class TrainModelStub(object):
    """Define the service
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.TrainModel = channel.unary_unary(
                '/TrainModel/TrainModel',
                request_serializer=loss__pb2.LossRequest.SerializeToString,
                response_deserializer=loss__pb2.LossResponse.FromString,
                )


class TrainModelServicer(object):
    """Define the service
    """

    def TrainModel(self, request, context):
        """Define RPC method for training model
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_TrainModelServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'TrainModel': grpc.unary_unary_rpc_method_handler(
                    servicer.TrainModel,
                    request_deserializer=loss__pb2.LossRequest.FromString,
                    response_serializer=loss__pb2.LossResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'TrainModel', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class TrainModel(object):
    """Define the service
    """

    @staticmethod
    def TrainModel(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/TrainModel/TrainModel',
            loss__pb2.LossRequest.SerializeToString,
            loss__pb2.LossResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)